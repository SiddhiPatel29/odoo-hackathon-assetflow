const express = require('express');
const router = express.Router();

// Temporary memory store for maintenance tickets
const mockedTickets = [];

// 🔧 1. REPORT A FAULT / REQUEST MAINTENANCE
router.post('/request', (req, res) => {
  try {
    const { assetId, reportedBy, issueDescription } = req.body;

    const newTicket = {
      id: `ticket_${Date.now()}`,
      assetId,
      reportedBy,
      issueDescription,
      status: 'Pending Approval', // Pipeline Stage 1
      createdAt: new Date()
    };

    mockedTickets.push(newTicket);
    res.status(201).json({ 
      message: "Maintenance request logged. Awaiting manager approval.", 
      ticket: newTicket 
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to log request.", error: err.message });
  }
});

//  2. APPROVE AND INITIATE REPAIR (Changes Asset Status)
router.patch('/approve/:ticketId', (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = mockedTickets.find(t => t.id === ticketId);

    if (!ticket) return res.status(404).json({ message: "Maintenance ticket not found." });

    ticket.status = 'Under Maintenance'; // Pipeline Stage 2

    res.status(200).json({ 
      message: "Ticket approved. Asset status locked to 'Under Maintenance'.", 
      ticket 
    });
  } catch (err) {
    res.status(500).json({ message: "Approval failed.", error: err.message });
  }
});

//  3. COMPLETE REPAIR (Release Asset back to Inventory)
router.patch('/complete/:ticketId', (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = mockedTickets.find(t => t.id === ticketId);

    if (!ticket) return res.status(404).json({ message: "Maintenance ticket not found." });

    ticket.status = 'Resolved'; // Pipeline Stage 3
    ticket.resolvedAt = new Date();

    res.status(200).json({ 
      message: "Repair complete! Asset status released back to 'Available'.", 
      ticket 
    });
  } catch (err) {
    res.status(500).json({ message: "Resolution failed.", error: err.message });
  }
});

module.exports = router;