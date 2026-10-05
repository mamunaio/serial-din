"use server";

import { prisma } from "@/lib/prisma";
import { MOCK_DOCTORS } from "@/lib/doctors";
import { revalidatePath } from "next/cache";

export interface BookingInput {
  name: string;
  phone: string;
  doctorId: string;
  appointmentDate?: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  error?: string;
  appointment?: {
    id: string;
    serialNumber: number;
    appointmentDate: string;
    status: string;
    patientName: string;
    patientPhone: string;
    doctorName: string;
    doctorSpecialization: string;
    chamberAddress: string;
    consultationFee: number;
  };
}

/**
 * Server Action to create or retrieve a User and book an Appointment with a Doctor.
 */
export async function bookAppointment(input: BookingInput): Promise<BookingResponse> {
  try {
    const { name, phone, doctorId, appointmentDate } = input;

    // 1. Input Validation
    if (!name || name.trim().length < 2) {
      return { success: false, error: "Please enter a valid patient name (minimum 2 characters)." };
    }

    const trimmedPhone = phone ? phone.trim().replace(/[\s-]/g, "") : "";
    if (!trimmedPhone || trimmedPhone.length < 6) {
      return { success: false, error: "Please enter a valid phone number." };
    }

    if (!doctorId) {
      return { success: false, error: "Please select a doctor for the appointment." };
    }

    // 2. Ensure Doctor exists in DB (sync from mock list if needed)
    let doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      const mockDoc = MOCK_DOCTORS.find((d) => d.id === doctorId);
      if (!mockDoc) {
        return { success: false, error: "Selected doctor was not found." };
      }

      doctor = await prisma.doctor.create({
        data: {
          id: mockDoc.id,
          name: mockDoc.name,
          specialization: mockDoc.specialization,
          phone: mockDoc.phone,
          chamberAddress: mockDoc.chamberAddress,
          consultationFee: mockDoc.consultationFee,
        },
      });
    }

    // 3. Find or Create User (Patient) based on unique phone
    const user = await prisma.user.upsert({
      where: { phone: trimmedPhone },
      update: {
        name: name.trim(),
      },
      create: {
        name: name.trim(),
        phone: trimmedPhone,
        role: "PATIENT",
      },
    });

    // 4. Calculate next serial number for this doctor on the selected date
    const targetDate = appointmentDate ? new Date(appointmentDate) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointmentsCount = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const nextSerialNumber = existingAppointmentsCount + 1;

    // 5. Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: targetDate,
        serialNumber: nextSerialNumber,
        status: "PENDING",
        userId: user.id,
        doctorId: doctor.id,
      },
      include: {
        user: true,
        doctor: true,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: `Appointment confirmed! Your Serial Number is #${appointment.serialNumber}`,
      appointment: {
        id: appointment.id,
        serialNumber: appointment.serialNumber,
        appointmentDate: appointment.appointmentDate.toISOString(),
        status: appointment.status,
        patientName: appointment.user.name,
        patientPhone: appointment.user.phone,
        doctorName: appointment.doctor.name,
        doctorSpecialization: appointment.doctor.specialization,
        chamberAddress: appointment.doctor.chamberAddress,
        consultationFee: appointment.doctor.consultationFee,
      },
    };
  } catch (error: unknown) {
    console.error("Booking error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process booking. Please try again.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
