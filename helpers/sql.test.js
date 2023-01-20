const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
    test("works: no jsToSql", function () {
        const result = sqlForPartialUpdate({ email: "email@email.com" });
        expect(result).toEqual({ setCols: "\"email\"=$1", values: ["email@email.com"] });
    });

    test("works: jsToSql", function () {
        const result = sqlForPartialUpdate({ firstName: "Test1", lastName: "Testing1" }, { firstName: "first_name", lastName: "last_name" });
        expect(result).toEqual({ setCols: "\"first_name\"=$1, \"last_name\"=$2", values: ["Test1", "Testing1"] });
    });
});