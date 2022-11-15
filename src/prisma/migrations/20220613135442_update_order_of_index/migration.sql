-- DropIndex
DROP INDEX "assetState_assetLocationId_assetLocationChangedOn_idx";

-- CreateIndex
CREATE INDEX "assetState_assetLocationChangedOn_assetLocationId_idx" ON "assetState"("assetLocationChangedOn", "assetLocationId");
