# Database Seed Script

This directory contains scripts to populate your Payload CMS database with sample data.

## Seed Script

The `seed.ts` script populates your database with:
- **6 Categories** (Beach House, Mountain Cabin, City Apartment, Villa, Countryside, Lakehouse)
- **6 Locations** (New Delhi, Jawai (Rajasthan), Jaipur, Pushkar, Ajmer, Ladakh)
- **12 Amenities** (WiFi, Pool, Kitchen, AC, Parking, TV, etc.)
- **1 Host** (ArbourStays - the main host for all listings)
- **6 Sample Listings** (One for each category and location, all managed by ArbourStays)

## Usage

### Run the seed script:

```bash
npm run seed
```

### What it does:

1. **Clears existing data** - Removes all existing listings, locations, hosts, amenities, and categories
2. **Creates categories** - Adds 6 stay-type categories
3. **Creates locations** - Adds 6 featured locations (cities)
4. **Creates amenities** - Adds 12 common amenities
5. **Creates host** - Adds the ArbourStays host profile
6. **Creates listings** - Adds 6 sample listings, each assigned to a different location, all managed by ArbourStays
7. **Updates counts** - Updates listing counts for categories, locations, and hosts

### Important Notes:

- ⚠️ This script will **DELETE ALL EXISTING DATA** in the following collections:
  - listings
  - locations
  - hosts
  - amenities
  - categories

- Make sure your database connection is configured in your `.env` file:
  ```
  DATABASE_URI=your_postgres_connection_string
  PAYLOAD_SECRET=your_secret_key
  ```

- The script uses Lexical rich text format for listing descriptions
- Sample data includes realistic addresses, coordinates, prices, and ratings
- Each listing is assigned to a specific location (New Delhi, Jawai, Jaipur, Pushkar, Ajmer, Ladakh)
- Each listing is assigned 4-8 random amenities from the seeded amenities
- Locations are marked as "featured" to appear in home page filter tabs

## Customizing the Seed Data

To customize the sample data, edit the following arrays in `seed.ts`:
- `sampleCategories` - Add/modify category types
- `sampleLocations` - Add/modify locations (cities/destinations)
- `sampleAmenities` - Add/modify amenities
- `sampleHosts` - Modify the ArbourStays host profile (currently only 1 host)
- `sampleListings` - Add/modify listings

## After Seeding

After running the seed script, you can:
1. Visit `/admin` to view the seeded data in Payload CMS
2. Visit the homepage to see the listings displayed
3. Navigate through categories and view listing details

## Troubleshooting

If you encounter errors:
1. Ensure your database is running and accessible
2. Check that `DATABASE_URI` is correctly set in `.env`
3. Verify that all Payload collections are properly configured
4. Make sure you have the necessary permissions on the database
