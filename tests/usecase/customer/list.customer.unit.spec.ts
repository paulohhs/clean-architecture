import CustomerFactory from "../../../src/domain/customer/factory/customer.factory";
import Address from "../../../src/domain/customer/value-object/address";
import ListCustomerUseCase from "../../../src/usecase/customer/list/list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Street", 1, "Zip", "City")
);

const customer2 = CustomerFactory.createWithAddress(
    "Customer 2",
    new Address("Street 2", 2, "Zip 2", "City 2")
);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Unit list customer", () => {
    it("should list customers", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);
        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2)
        expect(output.customers[0]!.id).toBe(customer1.id)
        expect(output.customers[0]!.name).toBe(customer1.name)
        expect(output.customers[0]!.address.street).toBe(customer1.address.street)
        expect(output.customers[1]!.id).toBe(customer2.id)
        expect(output.customers[1]!.name).toBe(customer2.name)
        expect(output.customers[1]!.address.street).toBe(customer2.address.street)
    });
});