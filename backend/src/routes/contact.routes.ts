import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { validateRequest } from '../middleware/validate';
import {
  createContactSchema,
  listContactQuerySchema,
  contactIdParamSchema,
  updateContactStatusSchema,
} from '../validators/contact.validator';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';
import { contactSubmissionLimiter } from '../middleware/rateLimiters';

const router = Router();

/**
 * Public Route
 * POST /api/contact - Submit a new contact message (Protected with anti-spam rate limiter)
 */
router.post(
  '/',
  contactSubmissionLimiter,
  validateRequest(createContactSchema),
  ContactController.submitContact
);

/**
 * Protected Admin Routes (Requires Authentication + ADMIN Role)
 */

// GET /api/contact - List contact messages with pagination (?page=1&limit=20&status=NEW)
router.get(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest(listContactQuerySchema),
  ContactController.getContactMessages
);

// GET /api/contact/:id - Retrieve specific message details by ID
router.get(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(contactIdParamSchema),
  ContactController.getContactMessageById
);

// PATCH /api/contact/:id - Update message status (NEW, READ, REPLIED, ARCHIVED)
router.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(updateContactStatusSchema),
  ContactController.updateContactStatus
);

// DELETE /api/contact/:id - Permanently delete a contact message
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(contactIdParamSchema),
  ContactController.deleteContact
);

export default router;
