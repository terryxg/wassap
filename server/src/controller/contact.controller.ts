import asyncHandler from "express-async-handler";
import File from "../model/file.model";
import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from "../constants/http";
import appAssert from "../services/assert_error";
import Contact, { ContactDocument } from "../model/contact.model";

import { Types } from "mongoose";

interface UserDownloadData {
  [key: string]: { number: number; name: string }[];
}

export const addToFile = asyncHandler(async (req, res) => {
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59, 999);
  const { name, number } = req.body;

  const newContact = await Contact.create({ name, number, userId: req.userId });

  let updateFile = await File.findOne({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
  if (updateFile === null) {
    updateFile = await File.create({
      contacts: [newContact._id],
    });

    res.status(OK).json({ message: "ContactAddedToFile" });
  } else {
    updateFile.contacts.push(newContact._id as Types.ObjectId);
    await updateFile.save();
    res.status(OK).json({ message: "ContactAddedToFile" });
  }
});

export const getFiles = asyncHandler(async (req, res) => {
  const { type } = req.params;

  let file;

  switch (type) {
    case "latest":
      file = await File.findOne().sort({ createdAt: -1 });
      break;

    default:
      file = await File.find();
      break;
  }

  appAssert(file === null, NOT_FOUND, "Error finding contacts");

  res.json(file);
});

export const downloadFile = asyncHandler(async (req, res) => {
  const userDownloadData: { name: string; number: number }[] = [];
  const { fileId } = req.params;

  const file = await File.findOne({ _id: fileId }).populate<{ contacts: ContactDocument[] }>(
    "contacts"
  );
  appAssert(file, NOT_FOUND, "FileDoesNotExist");

  // Collect contact information for download, excluding the current user
  for (const contact of file.contacts) {
    if (contact.userId?.toString() !== req.userId) {
      // Add contact name and number to the download data, excluding the current user's contact
      userDownloadData.push({ name: contact.name, number: contact.number });
    }
  }

  res.status(OK).json(userDownloadData);
});
