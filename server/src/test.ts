import fs from "fs";
import path from "path";

// Define types
interface UserInput {
  userId: number;
  input: string;
  timestamp: string;
}

// Mock database (replace with a real database in production)
const userInputs: UserInput[] = []; // Format: { userId, input, timestamp }

// Ensure 'downloads' directory exists
const downloadsDir: string = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
  console.log('Created "downloads" directory at:', downloadsDir);
}

// Function to add user input
function addUserInput(userId: number, input: string): void {
  const timestamp: string = new Date().toISOString();
  userInputs.push({ userId, input, timestamp });
  console.log(`Input saved for user ${userId}: ${input}`);
}

// Function to generate downloadable files for each user
function generateDownloadFiles(): void {
  const today: string = new Date().toISOString().split("T")[0]; // Get today's date

  // Organize data for each user
  const userDownloadData: Record<number, { input: string; inputUserId: number }[]> = {};

  userInputs.forEach(({ userId, input, timestamp }) => {
    const inputDate: string = timestamp.split("T")[0];
    if (inputDate === today) {
      for (const user of userInputs.map((u) => u.userId).filter((id) => id !== userId)) {
        if (!userDownloadData[user]) userDownloadData[user] = [];
        userDownloadData[user].push({ input, inputUserId: userId });
      }
    }
  });

  // Generate files for each user
  for (const [userId, inputs] of Object.entries(userDownloadData)) {
    const fileName: string = path.join(downloadsDir, `user_${userId}_data_${today}.json`);
    try {
      fs.writeFileSync(fileName, JSON.stringify(inputs, null, 2));
      console.log(`File created for user ${userId}: ${fileName}`);
    } catch (error) {
      console.error(`Error writing file for user ${userId}:`, error);
    }
  }
}

// Schedule daily job at a specific time (e.g., midnight)
//cron.schedule("0 0 * * *", generateDownloadFiles); // Adjust time as needed
setInterval(() => {
  generateDownloadFiles();
}, 3000);

// Example Usage
addUserInput(1, "User 1 input");
addUserInput(2, "User 2 input");
addUserInput(3, "User 3 input");
