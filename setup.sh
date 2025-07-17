#!/bin/bash

echo "Setting up Next.js Dashboard..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Copy environment variables
if [ ! -f .env ]; then
    echo "Copying environment variables..."
    cp .env.example .env
    echo "Please update .env with your actual database credentials"
fi

# Run database seeding
echo "Database setup complete. You can now:"
echo "1. Update your .env file with your database credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000/seed to seed your database"
echo "4. Login with: user@nextmail.com / 123456"

echo "Setup complete!"
