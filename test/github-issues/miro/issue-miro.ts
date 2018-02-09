import "reflect-metadata";
import { createTestingConnections, closeTestingConnections, reloadTestingDatabases } from "../../utils/test-utils";
import { User } from "./entity/User";
import { Name } from "./entity/Name";
import { Connection } from "../../../src/connection/Connection";
import { expect } from "chai";

describe("github issues > #1500 Should use embedded classes", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("Should use embedded classes", () => Promise.all(connections.map(async connection => {
        const userRepo = connection.getRepository(User);
        const user = new User();
        user.name = new Name();
        user.name.first = "Miroslav";
        user.name.last = "Kovac";
        await userRepo.save(user);

        const getUser = await userRepo.findOne({ name: { first: "Miroslav" } });
        expect(getUser !== undefined, "User is not empty");
        if (getUser != null)
            expect(getUser.name.last === "Kovac", "User is Kovac");
    })));

    // you can add additional tests if needed

});