import Lead from "../models/Lead.js";
import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();

const adminUser = {
  email: "admin@pocketlandz.com",
  password: "admin123",
  name: "Pocket Landz Admin"
};


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
  const leads = await Lead.find().sort({ createdAt: -1 });

  res.json({
    totalListings: listings.length,
    totalLeads: leads.length,
    totalAreas: [...new Set(listings.map((item) => item.area))].length,
    latestLead: leads[0] || null
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

router.get("/leads", authMiddleware, async (_req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

export default router;