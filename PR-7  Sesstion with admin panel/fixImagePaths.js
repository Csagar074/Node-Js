const mongoose = require('mongoose');
require('./config/db.config');
const Admin = require('./models/admin.model');
const fs = require('fs');
const path = require('path');

async function fixImagePaths() {
    try {
        const admins = await Admin.find();
        
        for (let admin of admins) {
            if (admin.profile_image && admin.profile_image.includes('uploads/admin/')) {
                const oldPath = admin.profile_image;
                const fileName = path.basename(oldPath);
                const newPath = `uploads/${fileName}`;
                
                // Check if old file exists and move it
                if (fs.existsSync(oldPath)) {
                    fs.renameSync(oldPath, newPath);
                    console.log(`Moved: ${oldPath} -> ${newPath}`);
                }
                
                // Update database
                admin.profile_image = newPath;
                await admin.save();
                console.log(`Updated DB for: ${admin.email}`);
            }
        }
        
        console.log(' All image paths fixed!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

fixImagePaths();
