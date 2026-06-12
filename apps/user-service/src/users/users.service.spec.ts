import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { User, UserRole } from '../entities/user.entity';

const mockUsersRepo = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = { name: 'Tien Nguyen', phone: '0323456789', role: UserRole.RIDER };

    it('create user and return data user', async () => {
      const savedUser = { id: 1, ...dto } as User;
      mockUsersRepo.findOneBy.mockResolvedValue(null);
      mockUsersRepo.create.mockReturnValue(savedUser);
      mockUsersRepo.save.mockResolvedValue(savedUser);

      const result = await service.create(dto);

      expect(result).toEqual(savedUser);
    });

    it('throw ConflictException if phone number exists', async () => {
      mockUsersRepo.findOneBy.mockResolvedValue({ id: 1 });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findUserById', () => {
    it('return user data if id found', async () => {
      const user = { id: 1, name: 'Tien Nguyen' } as User;
      mockUsersRepo.findOneBy.mockResolvedValue(user);

      const result = await service.findUserById(1);

      expect(result).toEqual(user);
    });

    it('return null if id not found', async () => {
      mockUsersRepo.findOneBy.mockResolvedValue(null);

      const result = await service.findUserById(999);

      expect(result).toBeNull();
    });
  });

  describe('findUserByPhone', () => {
    const phone = '0323456789';
    const createMockUser = (): User =>
      ({
        id: 1,
        name: 'Tien Nguyen',
        phone,
      }) as User;

    it('return user data if phone found', async () => {
      const user = createMockUser();

      mockUsersRepo.findOneBy.mockResolvedValue(user);

      const result = await service.findUserByPhone(phone);

      expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ phone });
      expect(result).toEqual(user);
    });

    it('return null if phone not found', async () => {
      mockUsersRepo.findOneBy.mockResolvedValue(null);

      const result = await service.findUserByPhone(phone);

      expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ phone });
      expect(result).toBeNull();
    });
  });

  describe('deleteUserById', () => {
    it('delete user success', async () => {
      const user = { id: 1 } as User;
      mockUsersRepo.findOneBy.mockResolvedValue(user);
      mockUsersRepo.delete.mockResolvedValue(undefined);

      await expect(service.delete(1)).resolves.toBeUndefined();
    });

    it('throw NotFoundException if user not found', async () => {
      mockUsersRepo.findOneBy.mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
