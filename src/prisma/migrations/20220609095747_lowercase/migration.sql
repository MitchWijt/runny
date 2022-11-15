/*
  Warnings:

  - You are about to drop the column `AssetAddOn` on the `assetState` table. All the data in the column will be lost.
  - You are about to drop the column `AssetLastDetection` on the `assetState` table. All the data in the column will be lost.
  - You are about to drop the column `AssetLocationChangedOn` on the `assetState` table. All the data in the column will be lost.
  - You are about to drop the column `AssetType` on the `assetState` table. All the data in the column will be lost.
  - Added the required column `assetAddOn` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetLastDetection` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetLocationChangedOn` to the `assetState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetType` to the `assetState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assetState" DROP COLUMN "AssetAddOn",
DROP COLUMN "AssetLastDetection",
DROP COLUMN "AssetLocationChangedOn",
DROP COLUMN "AssetType",
ADD COLUMN     "assetAddOn" TEXT NOT NULL,
ADD COLUMN     "assetLastDetection" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assetLocationChangedOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assetType" TEXT NOT NULL;
