import { PropertyEntity } from '../entities/property_entity';
import { PropertyMapper } from '../mappers/property_mapper';
import { Property } from '../../../domain/entities/property';

describe('PropertyMapper', () => {
    it("deve converter PropertyEntity em Property corretamente", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "Cabana na Montanha";
        entity.description = "Uma cabana aconchegante na montanha";
        entity.maxGuests = 6;
        entity.basePricePerNight = 200;

        const property = PropertyMapper.toDomain(entity);

        expect(property.getId()).toBe(entity.id);
        expect(property.getName()).toBe(entity.name);
        expect(property.getDescription()).toBe(entity.description);
        expect(property.getMaxGuests()).toBe(entity.maxGuests);
        expect(property.getBasePricePerNight()).toBe(entity.basePricePerNight);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "";
        entity.description = "Uma cabana aconchegante na montanha";
        entity.maxGuests = 6;
        entity.basePricePerNight = 200;
        
        expect(() => {
            PropertyMapper.toDomain(entity);
        }).toThrow("O nome é obrigatório");

        entity.name = "Cabana na Montanha";
        entity.maxGuests = 0;

        expect(() => {
            PropertyMapper.toDomain(entity);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero");

        entity.maxGuests = -2;

        expect(() => {
            PropertyMapper.toDomain(entity);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero");
    });
    
    it("deve converter Property para PropertyEntity corretamente", () => {
        const property = new Property(
            "1",
            "Casa de Campo",
            "Uma casa espaçosa no campo",
            8,
            300
        );

        const entity = PropertyMapper.toPersistence(property);

        expect(entity.id).toBe(property.getId());
        expect(entity.name).toBe(property.getName());
        expect(entity.description).toBe(property.getDescription());
        expect(entity.maxGuests).toBe(property.getMaxGuests());
        expect(entity.basePricePerNight).toBe(property.getBasePricePerNight());
    });
});