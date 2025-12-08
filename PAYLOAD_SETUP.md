# Payload CMS Setup Guide for Arbour Stays

## 🎯 Current Status

✅ **Payload CMS is installed and configured**
✅ **All collections are created**
✅ **Frontend is integrated with fallback support**
✅ **Development server is running on port 3006**

## 📋 What's Been Done

### Collections Created:
1. **Listings** - Your stay properties (renamed from Stays)
2. **Categories** - Stay types and classifications
3. **Hosts** - Property hosts/owners
4. **Amenities** - Property features (WiFi, Pool, etc.)
5. **Reviews** - Guest reviews and ratings
6. **Bookings** - Reservation management
7. **Availability** - Booking calendar and pricing

### Frontend Integration:
- Home page fetches from Payload API
- Category pages fetch from Payload API
- Listing detail pages fetch from Payload API
- Booking widget for availability checking
- **Fallback to mock data** if Payload has no data yet

## 🚀 Getting Started

### Step 1: Access Payload Admin Panel

Open your browser and navigate to:
```
http://localhost:3006/admin
```

### Step 2: Create Your First Admin User

You'll be prompted to create an admin account:
- **Email**: your-email@example.com
- **Password**: (minimum 8 characters)

### Step 3: Populate Your Data (In This Order)

#### 1. Create Categories
Navigate to **Categories** in the admin sidebar:
- Click "Create New"
- Example categories:
  - **Name**: Beachfront
  - **Slug**: beachfront
  - **Taxonomy**: stay-type
  - **Icon**: beach
  - **Is Active**: ✓

Create more categories:
- Cabins (cabins, stay-type)
- Villas (villas, stay-type)
- Trending (trending, stay-type)
- Amazing pools (amazing-pools, property-feature)

#### 2. Create Amenities
Navigate to **Amenities**:
- WiFi (wifi, internet-office)
- Swimming Pool (pool, outdoor)
- Kitchen (kitchen, kitchen-dining)
- Air Conditioning (ac, heating-cooling)
- Parking (parking, parking)

#### 3. Create Hosts
Navigate to **Hosts**:
- **Display Name**: John Smith
- **Handle**: @johnsmith
- **Email**: john@example.com
- **Verified**: ✓
- **Joined Date**: (today's date)
- Upload an avatar image

#### 4. Upload Media (Optional but Recommended)
Navigate to **Media**:
- Upload property images
- These will be used for featured images and galleries

#### 5. Create Listings
Navigate to **Listings**:
- **Title**: Beautiful Beachfront Villa
- **Slug**: beautiful-beachfront-villa
- **Handle**: beautiful-beachfront-villa-1
- **Category**: Select "Beachfront"
- **Host**: Select your created host
- **Featured Image**: Select from media
- **Gallery Images**: Add multiple images
- **Price**: 250 (per night)
- **Address**: 123 Beach Road, Malibu, CA
- **Map Coordinates**:
  - Lat: 34.0259
  - Lng: -118.7798
- **Max Guests**: 8
- **Bedrooms**: 4
- **Beds**: 5
- **Bathrooms**: 3
- **Amenities**: Select multiple amenities
- **Booking Settings**:
  - Check-in Time: 3:00 PM
  - Check-out Time: 11:00 AM
  - Minimum Stay: 2 nights
  - Cleaning Fee: 100
- **Is Active**: ✓

## 🔄 How the Fallback System Works

The application is now smart about data fetching:

1. **First, it tries Payload CMS**: Fetches data from your database
2. **If Payload is empty or fails**: Falls back to mock data automatically
3. **No errors shown to users**: Seamless experience during setup

This means:
- ✅ Your site works **immediately** with demo data
- ✅ As you add data to Payload, it **automatically replaces** mock data
- ✅ You can **gradually migrate** content without breaking the site

## 🎨 Frontend Pages

### Homepage
```
http://localhost:3006/
```
Shows:
- Hero search form (Stays only)
- Featured categories
- Featured listings
- Hosts showcase

### Category Pages
```
http://localhost:3006/stay-categories/all
http://localhost:3006/stay-categories/beachfront
```

### Listing Detail Pages
```
http://localhost:3006/stay-listings/[handle]
```
Shows full listing details with booking widget

## 📊 Monitoring Data Source

Check your browser console to see which data source is being used:
- **"Error fetching categories"** → Using mock data
- **No errors** → Using Payload data

## 🔧 Troubleshooting

### Database Connection Issues
If you see database errors:
1. Check PostgreSQL is running: `psql -U postgres -h localhost -p 5436`
2. Verify `.env` file has correct `DATABASE_URI`
3. Check database exists: `CREATE DATABASE arbour_stays_dev;`

### Admin Panel Not Loading
1. Check server is running on port 3006
2. Clear browser cache
3. Check for errors in terminal

### API Not Found Errors
- These are normal when database is empty
- The app will use mock data automatically
- Start adding data in Payload admin to replace mock data

## 📝 Collections Reference

### Listings Collection
Full property details with relationships to:
- Categories (many-to-one)
- Hosts (many-to-one)
- Amenities (many-to-many)

### Categories Collection
Organize listings by:
- Stay type (beachfront, cabin, villa)
- Property feature (pool, view)
- Location type (urban, rural)

### Hosts Collection
Property owner/manager profiles with:
- Verification status
- Response rates
- Ratings and reviews

### Amenities Collection
Property features grouped by:
- Internet & Office
- Kitchen & Dining
- Entertainment
- Outdoor
- And 7 more categories

### Reviews Collection
Guest feedback with:
- Overall rating (1-5 stars)
- Category ratings (cleanliness, accuracy, etc.)
- Photos
- Host responses

### Bookings Collection
Reservation management with:
- Auto-generated booking numbers
- Guest details
- Pricing breakdown
- Payment status
- Cancellation handling

### Availability Collection
Booking calendar with:
- Date ranges
- Status (available, booked, blocked)
- Price overrides for peak seasons
- Minimum/maximum stay rules

## 🎯 Next Steps

1. ✅ Access admin panel: `http://localhost:3006/admin`
2. ✅ Create admin user
3. ✅ Add categories
4. ✅ Add hosts
5. ✅ Add amenities
6. ✅ Create your first listing
7. ✅ View it on the frontend: `http://localhost:3006/`

## 🚀 Going to Production

When ready to deploy:
1. Update `.env` with production database
2. Update `NEXT_PUBLIC_PAYLOAD_URL` with production URL
3. Run `npm run build`
4. Deploy to your hosting platform

## 📞 Need Help?

If you encounter issues:
1. Check the terminal for error messages
2. Check browser console for API errors
3. Verify database connection
4. Ensure all environment variables are set

---

**Happy building! 🏠✨**
