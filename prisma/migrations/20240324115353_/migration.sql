-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Bin" (
    "id" SERIAL NOT NULL,
    "wkt" TEXT NOT NULL,
    "servicepointname" TEXT NOT NULL,
    "lat" FLOAT NOT NULL,
    "long" FLOAT NOT NULL,
    "location" TEXT NOT NULL,
    "postalcode" BIGINT NOT NULL,
    "ictequipment" BOOLEAN NOT NULL,
    "batteries" BOOLEAN NOT NULL,
    "lamps" BOOLEAN NOT NULL,
    "smallhouseholdappliances" BOOLEAN NOT NULL,
    "gamingconsoles" BOOLEAN NOT NULL,
    "audiosystems" BOOLEAN NOT NULL,
    "powersupplies" BOOLEAN NOT NULL,
    "website" TEXT NOT NULL,
    "premisestype" TEXT NOT NULL,
    "dateupdated" BIGINT NOT NULL,
 
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);