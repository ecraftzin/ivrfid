/**
 * Database Verification Script
 * Run this to verify your Supabase database setup
 * 
 * Usage: node verify-database.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jkyrsprkqcualoiirumk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreXJzcHJrcWN1YWxvaWlydW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDI2NjQsImV4cCI6MjA4MjMxODY2NH0.vBfZwhnvblDxHXvBn4l42ggZSHXmp-uJjJkqlW97wLI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDatabase() {
  console.log('🔍 Verifying Supabase Database Setup...\n');

  try {
    // Check Solutions
    console.log('📦 Checking Solutions Table...');
    const { data: solutions, error: solutionsError } = await supabase
      .from('solutions')
      .select('*', { count: 'exact' });

    if (solutionsError) {
      console.error('❌ Error fetching solutions:', solutionsError.message);
    } else {
      console.log(`✅ Solutions: ${solutions.length} records found`);
      console.log(`   - RFID Solutions: ${solutions.filter(s => s.category === 'RFID').length}`);
      console.log(`   - BLE Solutions: ${solutions.filter(s => s.category === 'BLE').length}`);
      console.log(`   - Published: ${solutions.filter(s => s.is_published).length}`);
    }

    // Check Products
    console.log('\n📦 Checking Products Table...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (productsError) {
      console.error('❌ Error fetching products:', productsError.message);
    } else {
      console.log(`✅ Products: ${products.length} records found`);
      console.log(`   - RFID Tags: ${products.filter(p => p.category === 'RFID Tags').length}`);
      console.log(`   - Metal Asset Tags: ${products.filter(p => p.category === 'Metal Asset Tags').length}`);
      console.log(`   - Published: ${products.filter(p => p.is_published).length}`);
    }

    // Check Blog Posts
    console.log('\n📦 Checking Blog Posts Table...');
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });

    if (blogError) {
      console.error('❌ Error fetching blog posts:', blogError.message);
    } else {
      console.log(`✅ Blog Posts: ${blogPosts.length} records found`);
      console.log(`   - Published: ${blogPosts.filter(b => b.is_published).length}`);
      console.log(`   - Featured: ${blogPosts.filter(b => b.is_featured).length}`);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 DATABASE VERIFICATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Solutions Table: ${solutions?.length || 0} records`);
    console.log(`✅ Products Table: ${products?.length || 0} records`);
    console.log(`✅ Blog Posts Table: ${blogPosts?.length || 0} records`);
    console.log('='.repeat(50));

    if (solutions?.length === 14 && products?.length === 10 && blogPosts?.length >= 1) {
      console.log('\n🎉 SUCCESS! Database is properly configured!');
      console.log('\n📝 Next Steps:');
      console.log('   1. Create admin user in Supabase Dashboard');
      console.log('   2. Create media storage bucket');
      console.log('   3. Start the app: npm start');
      console.log('   4. Login at: http://localhost:3000/admin/login');
    } else {
      console.log('\n⚠️  WARNING: Expected data counts do not match!');
      console.log('   Expected: 14 solutions, 10 products, 1+ blog posts');
      console.log(`   Found: ${solutions?.length || 0} solutions, ${products?.length || 0} products, ${blogPosts?.length || 0} blog posts`);
    }

    console.log('\n');

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.error('\nPlease check:');
    console.error('   1. Supabase URL and API key are correct');
    console.error('   2. Database tables have been created');
    console.error('   3. RLS policies allow public read access');
  }
}

// Run verification
verifyDatabase();

