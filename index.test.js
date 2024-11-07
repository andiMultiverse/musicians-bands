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

  test("should allow a band to have multiple musicians", async () => {
    const band = await Band.create({
      name: "Can",
      genre: "Indie",
    });

    const musician1 = await Musician.create({
      name: "Amelia Fletcher",
      instrument: "Guitar",
    });
    const musician2 = await Musician.create({
      name: "Calvin Johnson",
      instrument: "Guitar",
    });

    await band.addMusicians([musician1, musician2]);

    const foundBand1Musicians = await band.getMusicians();

    expect(foundBand1Musicians.length).toBe(2);
  });

  it("should allow multiple bands to share songs and each band to have multiple songs", async () => {
    const band1 = await Band.create({ name: "Heavenly", genre: "Indie Pop" });
    const band2 = await Band.create({
      name: "Another Sunny Day",
      genre: "Indie Pop",
    });

    const song1 = await Song.create({ title: "C Is the Heavenly Option" });
    const song2 = await Song.create({ title: "I'm In Love With A Girl Who Doesn't Know I Exist" });

    
    await band1.addSongs([song1, song2]);
    await band2.addSong(song1);

    const band1Songs = await band1.getSongs();
    expect(band1Songs.length).toBe(2);

    // Verify songs associated with band2
    const band2Songs = await band2.getSongs();
    expect(band2Songs.length).toBe(1);
    // expect(band2Songs.map((song) => song.title)).to.include(
    //   "C Is the Heavenly Option"
    // );
  });
});
