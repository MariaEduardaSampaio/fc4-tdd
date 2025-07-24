import { BookingEntity } from '../entities/booking_entity';
import { BookingMapper } from '../mappers/booking_mapper';
import { UserEntity } from '../entities/user_entity';
import { PropertyEntity } from '../entities/property_entity';
import { User } from '../../../domain/entities/user';
import { Booking } from '../../../domain/entities/booking';
import { Property } from '../../../domain/entities/property';
import { DateRange } from '../../../domain/value_objects/date_range';


describe("BookingMapper", () => {

    it("deve converter BookingEntity em Booking corretamente", () => {
        const property = new PropertyEntity();
        property.id = "1";
        property.name = "Cabana na Montanha";
        property.description = "Uma cabana aconchegante na montanha";
        property.maxGuests = 6;
        property.basePricePerNight = 200;

        const user = new UserEntity();
        user.id = "1";
        user.name = "João";

        const bookingEntity = new BookingEntity();
        bookingEntity.id = "1";
        bookingEntity.status = "CONFIRMED";
        bookingEntity.guest = user;
        bookingEntity.guestCount = 2;
        bookingEntity.startDate = new Date("2023-01-01");
        bookingEntity.endDate = new Date("2023-01-05");
        bookingEntity.totalPrice = 600;
        bookingEntity.property = property;

        const booking = BookingMapper.toDomain(bookingEntity);

        expect(booking.getId()).toBe(bookingEntity.id);
        expect(booking.getStatus()).toBe(bookingEntity.status);
        expect(booking.getGuestCount()).toBe(bookingEntity.guestCount);
        expect(booking.getDateRange().getStartDate()).toBe(bookingEntity.startDate);
        expect(booking.getDateRange().getEndDate()).toBe(bookingEntity.endDate);
        expect(booking.getTotalPrice()).toBe(Number(bookingEntity.totalPrice));
        
        expect(booking.getProperty().getId()).toBe(property.id);
        expect(booking.getProperty().getName()).toBe(property.name);
        expect(booking.getProperty().getDescription()).toBe(property.description);
        expect(booking.getProperty().getMaxGuests()).toBe(property.maxGuests);
        expect(booking.getProperty().getBasePricePerNight()).toBe(property.basePricePerNight);
        
        expect(booking.getUser()).toBeInstanceOf(User);
        expect(booking.getGuest()).toBeInstanceOf(User);
        expect(booking.getGuest().getId()).toBe(user.id);
        expect(booking.getGuest().getName()).toBe(user.name);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        const property = new PropertyEntity();
        property.id = "1";
        property.name = "Cabana na Montanha";
        property.description = "Uma cabana aconchegante na montanha";
        property.maxGuests = 6;
        property.basePricePerNight = 200;

        const user = new UserEntity();
        user.id = "1";
        user.name = "João";

        const bookingEntity = new BookingEntity();
        bookingEntity.id = "1";
        bookingEntity.status = "CONFIRMED";
        bookingEntity.guest = user;
        bookingEntity.guestCount = 0;
        bookingEntity.startDate = new Date("2023-01-01");
        bookingEntity.endDate = new Date("2023-01-05");
        bookingEntity.totalPrice = 600;
        bookingEntity.property = property;

        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow("O número de hóspedes deve ser maior que zero.");

        property.name = "";
        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow("O nome é obrigatório");

        property.name = "Cabana na Montanha";
        property.maxGuests = 0;
        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero");

        user.name = "";
        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow("O nome é obrigatório");
        
        user.name = "João";
        user.id = "";
        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow("O ID é obrigatório");
    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        const property = new Property(
            "1", 
            "Casa de Campo", 
            "Uma casa espaçosa no campo", 
            8, 
            300
        );

        const user = new User("1", "João");

        const dateRange = new DateRange(
            new Date("2025-07-21"), 
            new Date("2025-07-23")
        );

        const booking = new Booking("1", property, user, dateRange, 2);

        const bookingEntity = BookingMapper.toPersistence(booking);
        
        expect(bookingEntity.id).toBe(booking.getId());
        expect(bookingEntity.status).toBe(booking.getStatus());
        expect(bookingEntity.guestCount).toBe(booking.getGuestCount());
        expect(bookingEntity.startDate).toBe(booking.getDateRange().getStartDate());
        expect(bookingEntity.endDate).toBe(booking.getDateRange().getEndDate());
        expect(bookingEntity.totalPrice).toBe(booking.getTotalPrice());
        expect(bookingEntity.property.id).toBe(property.getId());
        expect(bookingEntity.property.name).toBe(property.getName());
        expect(bookingEntity.property.description).toBe(property.getDescription());
        expect(bookingEntity.property.maxGuests).toBe(property.getMaxGuests());
        expect(bookingEntity.property.basePricePerNight).toBe(property.getBasePricePerNight());
        expect(bookingEntity.guest.id).toBe(user.getId());
        expect(bookingEntity.guest.name).toBe(user.getName());
    });
});