import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { PropertyController } from "./property_controller";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { PropertyService } from "../../application/services/property_service";
import { UserEntity } from "../persistence/entities/user_entity";
import { BookingEntity } from "../persistence/entities/booking_entity";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let propertyRepository: TypeORMPropertyRepository;
let propertyService: PropertyService;
let propertyController: PropertyController;

beforeAll(async () => {
    dataSource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [PropertyEntity, UserEntity, BookingEntity],
        synchronize: true,
        logging: false,
    });

    await dataSource.initialize();

    propertyRepository = new TypeORMPropertyRepository(
        dataSource.getRepository(PropertyEntity)
    );

    propertyService = new PropertyService(propertyRepository);

    propertyController = new PropertyController(propertyService);

    app.post("/properties", (req, res, next) => {
        propertyController.createProperty(req, res).catch((err) => next(err));
    });
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("PropertyController", () => {
    it("deve criar uma propriedade com sucesso", async () =>  {
        const response = await request(app).post("/properties").send({
            id: "1",
            name: "Casa de Praia",
            description: "Uma casa de praia linda",
            maxGuests: 5,
            pricePerNight: 180
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Property created successfully");
        expect(response.body.property).toHaveProperty("id");
        expect(response.body.property).toHaveProperty("name");
    });

    it("deve retornar erro com código 400 e mensagem 'O nome da propriedade é obrigatório.' ao enviar um nome vazio", async () =>  {
        const response = await request(app).post("/properties").send({
            id: "1",
            name: "",
            description: "Uma casa de praia linda",
            maxGuests: 5,
            pricePerNight: 180
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O nome é obrigatório");
    });

    it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero ou negativo", async () =>  {
        let invalidData = {
            id: "1",
            name: "Casa de Praia",
            description: "Uma casa de praia linda",
            maxGuests: 0,
            pricePerNight: 180
        };

        let response = await request(app).post("/properties").send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O número máximo de hóspedes deve ser maior que zero");

        invalidData.maxGuests = -1;
        response = await request(app).post("/properties").send(invalidData);
  
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O número máximo de hóspedes deve ser maior que zero");
    });

    it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente", async () =>  {
        let invalidData = {
            id: "1",
            name: "Casa de Praia",
            description: "Uma casa de praia linda",
            maxGuests: 2,
            pricePerNight: 0
        };

        let response = await request(app).post("/properties").send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O preço base por noite é obrigatório.");

        invalidData.pricePerNight = -1;
        response = await request(app).post("/properties").send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O preço base por noite é obrigatório.");
    });
});
