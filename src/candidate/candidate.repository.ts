import { Injectable } from '@nestjs/common';
import { Candidate } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';

@Injectable()
export class CandidateRepository {
  constructor(private prismaService: PrismaService) {}

  public findCandidateByID = async (id: number): Promise<Candidate> =>
    await this.prismaService.candidate.findUnique({ where: { id: id } });

  public findCandidateByEmail = async (email: string): Promise<Candidate> =>
    await this.prismaService.candidate.findUnique({ where: { email: email } });

  public findCandidateByCIN = async (CIN: number): Promise<Candidate> =>
    await this.prismaService.candidate.findUnique({ where: { cin: CIN } });

  public findCandidateByUsername = async (
    username: string,
  ): Promise<Candidate> =>
    await this.prismaService.candidate.findUnique({
      where: { login: username },
    });

  public findCandidateByPhoneNumber = async (
    phone: number,
  ): Promise<Candidate> =>
    await this.prismaService.candidate.findUnique({
      where: { phone_number: phone },
    });

  public createCandidate = async (
    candidate: Omit<Candidate, 'id' | 'password_match'>,
  ): Promise<Candidate> =>
    await this.prismaService.candidate.create({ data: candidate });
}
