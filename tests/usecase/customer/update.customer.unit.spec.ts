import CustomerFactory from "../../../src/domain/customer/factory/customer.factory";
import Address from "../../../src/domain/customer/value-object/address";
import UpdateCustomerUseCase from "../../../src/usecase/customer/update/update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 1, "Zip", "City")
);

const input = {
    id: customer.getId(),
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 2,
        zip: "Zip Updated",
        city: "City Updated",
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Unit test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});