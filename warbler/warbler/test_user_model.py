"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database)

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        # Establish an application context
        self.app_context = app.app_context()
        self.app_context.push()

        # Create our tables (we do this here, so we only create the tables
        # once for all tests --- in each test, we'll delete the data
        # and create fresh new clean test data)
        db.create_all()

        # Delete data from User, Message, and Follows tables
        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        # Create a test client
        self.client = app.test_client()

    def tearDown(self):
        """Clean up after tests."""
        # Remove the application context
        self.app_context.pop()

        # Establish an application context
        with app.app_context():
            # Drop all database tables
            db.drop_all()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)
