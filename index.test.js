const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    const band = await Band.create({ name: "Dolly Mixture", genre: "Twee" });
    expect(band).toEqual(
      expect.objectContaining({
        name: "Dolly Mixture",
        genre: "Twee",
      })
    );
  });

  test("can create a Musician", async () => {
    const musician = await Musician.create({
      name: "amelia fletcher",
      instrument: "guitar",
    });
    expect(musician).toEqual(
      expect.objectContaining({
        name: "amelia fletcher",
        instrument: "guitar",
      })
    );
  });

  test("can update a Band", async () => {
    const band = await Band.create({ name: "Dolly Mixture", genre: "Twee" });
    await band.update({ genre: "indie pop" });
    const updated = await Band.findByPk(band.id);
    expect(updated).toEqual(
      expect.objectContaining({
        name: "Dolly Mixture",
        genre: "indie pop",
      })
    );
  });

  test("can update a Musician", async () => {
    const musician = await Musician.create({
      name: "Amelia Fletcher",
      instrument: "Vocals",
    });
    await musician.update({ instrument: "Guitar" });
    const updatedMusician = await Musician.findByPk(musician.id);
    expect(updatedMusician).toEqual(
      expect.objectContaining({
        name: "Amelia Fletcher",
        instrument: "Guitar",
      })
    );
  });

  test("can delete a Band", async () => {
    const band = await Band.create({ name: "Dolly Mixture", genre: "Twee" });
    await band.destroy();
    const deletedBand = await Band.findByPk(band.id);
    expect(deletedBand).toBeNull();
  });

  test("can delete a Musician", async () => {
    const musician = await Musician.create({
      name: "Amelia Fletcher",
      instrument: "Vocals",
    });
    await musician.destroy();
    const deletedMusician = await Musician.findByPk(musician.id);
    expect(deletedMusician).toBeNull();
  });
});
