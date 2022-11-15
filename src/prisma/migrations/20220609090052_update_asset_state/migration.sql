/*
  Warnings:

  - Added the required column `AssetAddOn` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AssetLastDetection` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AssetLocationChangedOn` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AssetType` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetLocationId` to the `assetState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assetState" ADD COLUMN     "AssetAddOn" TEXT NOT NULL,
ADD COLUMN     "AssetLastDetection" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "AssetLocationChangedOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "AssetType" TEXT NOT NULL,
ADD COLUMN     "assetLocationId" TEXT NOT NULL;
