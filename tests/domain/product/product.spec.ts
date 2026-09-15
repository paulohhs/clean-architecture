import Product from "../../../src/domain/product/entity/product";

describe("Product unit tests", () => {

    it("show throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Produto 1", 100);
        }).toThrow("product: ID is required");
    });

    it("show throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrow("product: Name is required");
    });

    it("show throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("1", "Produto 1", -1);
        }).toThrow("product: Price must be greater than zero");
    });

    it("should throw error when without id, name and price less than zero", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrow("product: ID is required, product: Name is required, product: Price must be greater than zero");
  });

    it("should change name", () => {
        const product = new Product("1", "Produto 1", 100);
        product.changeName("Produto 2");
        expect(product.name).toBe("Produto 2");
    });

    it("should change price", () => {
        const product = new Product("1", "Produto 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });

});
