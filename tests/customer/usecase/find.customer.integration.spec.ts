import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../src/infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../src/infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../../src/domain/customer/value-object/address";
import Customer from "../../../src/domain/customer/entity/customer";
import FindCustomerUseCase from "../../../src/usecase/customer/find/find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "zip", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer)


        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "John",
            address : {
                street: "Street", 
                number: 123, 
                zip: "zip", 
                city: "city"
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
});