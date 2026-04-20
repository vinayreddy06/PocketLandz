import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();

const adminUser = {
  email: "admin@pocketlandz.com",
  password: "admin123",
  name: "Pocket Landz Admin"
};

const adminLeads = [
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "9876543210",
    interest: "Kokapet",
    createdAt: "2026-04-17"
  },
  {
    id: 2,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "9988776655",
    interest: "Tellapur Elite Plots",
    createdAt: "2026-04-17"
  }
];

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (token !== "pocket-landz-admin-token") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === adminUser.email && password === adminUser.password) {
    return res.json({
      token: "pocket-landz-admin-token",
      user: {
        name: adminUser.name,
        email: adminUser.email
      }
    });
  }

  return res.status(401).json({ message: "Invalid email or password" });
});

router.get("/dashboard", authMiddleware, async (_req, res) => {
  const listings = await Listing.find();

  res.json({
    totalListings: listings.length,
    totalLeads: adminLeads.length,
    totalAreas: [...new Set(listings.map((item) => item.area))].length,
    latestLead: adminLeads[adminLeads.length - 1] || null
  });
});

router.get("/listings", authMiddleware, async (_req, res) => {
  const listings = await Listing.find().sort({ createdAt: -1 });
  res.json(listings);
});

router.get("/listings/:id", authMiddleware, async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  res.json(listing);
});

router.post("/listings", authMiddleware, async (req, res) => {
  const newListing = await Listing.create({
    ...req.body,
    verified: Boolean(req.body.verified)
  });

  res.status(201).json(newListing);
});

router.put("/listings/:id", authMiddleware, async (req, res) => {
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      verified: Boolean(req.body.verified)
    },
    { new: true }
  );

  if (!updatedListing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  res.json(updatedListing);
});

router.delete("/listings/:id", authMiddleware, async (req, res) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.id);

  if (!deletedListing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  res.json({ message: "Listing deleted" });
});

router.get("/leads", authMiddleware, (_req, res) => {
  res.json(adminLeads);
});

export default router;