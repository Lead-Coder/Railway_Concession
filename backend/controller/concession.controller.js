const cron = require("node-cron");
const db = require("../models");
const Concession = db.concession;
const { Op } = require("sequelize");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        const today = new Date();
        
        // Find and update expired concessions
        const expiredConcessions = await Concession.update(
            { status: "expired" }, // Or `destroy` to delete if required
            {
                where: {
                    expiry_date: { [Op.lt]: today },
                    status: { [Op.ne]: "expired" }
                }
            }
        );

        console.log(`Expired concessions processed: ${expiredConcessions[0]}`);
    } catch (error) {
        console.error("Error updating expired concessions:", error.message);
    }
});
