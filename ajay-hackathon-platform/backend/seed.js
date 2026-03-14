/**
 * Seed script — populates DB with sample data.
 * Run: node seed.js
 * (from the backend/ directory, with .env set up)
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Hackathon = require('./models/Hackathon');
const Internship = require('./models/Internship');
const User = require('./models/User');

const hackathons = [
  {
    title: 'Smart India Hackathon 2025',
    organizer: 'Ministry of Education, India',
    description: 'India\'s biggest hackathon for students to solve real-world problems across multiple domains including health, agriculture, smart cities, and more.\n\nTeams of 2-6 members can register. Top teams win cash prizes, internships, and incubation support.',
    deadline: new Date('2025-09-30'),
    prize: '₹1,00,000',
    mode: 'hybrid',
    tags: ['AI/ML', 'IoT', 'Web Dev', 'Blockchain'],
    registrationLink: 'https://sih.gov.in',
    featured: true,
  },
  {
    title: 'HackWithInfy 2025',
    organizer: 'Infosys',
    description: 'Infosys HackWithInfy is a coding contest for engineering students from across India. Solve complex programming challenges and win exciting prizes.\n\nTop performers get a chance to join Infosys.',
    deadline: new Date('2025-07-15'),
    prize: '₹75,000',
    mode: 'online',
    tags: ['DSA', 'Competitive Programming', 'Full Stack'],
    registrationLink: 'https://hackwithinfy.infosys.com',
    featured: true,
  },
  {
    title: 'MLH Global Hackathon',
    organizer: 'Major League Hacking',
    description: 'Join thousands of hackers globally in building innovative projects over 48 hours. Mentors from top tech companies. Prizes across multiple tracks.',
    deadline: new Date('2025-08-20'),
    prize: '$5,000',
    mode: 'online',
    tags: ['Open Source', 'Web3', 'AI', 'Hardware'],
    registrationLink: 'https://mlh.io',
    featured: true,
  },
  {
    title: 'CodeChef SnackDown',
    organizer: 'CodeChef',
    description: 'A global programming competition for teams of 2. Multiple rounds leading to a grand finale with top coders from around the world.',
    deadline: new Date('2025-06-30'),
    prize: '$10,000',
    mode: 'online',
    tags: ['Competitive Programming', 'Algorithms'],
    registrationLink: 'https://codechef.com/snackdown',
    featured: false,
  },
  {
    title: 'Flipkart GRiD 6.0',
    organizer: 'Flipkart',
    description: 'Engineering challenge for students to solve e-commerce problems using technology. Multiple tracks including software development, robotics, and data science.',
    deadline: new Date('2025-10-01'),
    prize: '₹2,00,000',
    mode: 'hybrid',
    tags: ['E-Commerce', 'Robotics', 'Data Science', 'SDE'],
    registrationLink: 'https://unstop.com/flipkart-grid',
    featured: true,
  },
  {
    title: 'Google Solution Challenge',
    organizer: 'Google Developer Student Clubs',
    description: 'Build solutions using Google technologies to address one of the UN\'s 17 Sustainable Development Goals.\n\nTop 100 teams receive mentoring from Google engineers. Top 10 teams present at Google HQ.',
    deadline: new Date('2025-03-31'),
    prize: 'Google Swag + Internship Opportunity',
    mode: 'online',
    tags: ['Google Cloud', 'Firebase', 'Flutter', 'SDG'],
    registrationLink: 'https://developers.google.com/community/gdsc-solution-challenge',
    featured: true,
  },
];

const internships = [
  {
    company: 'Google',
    title: 'Software Engineering Intern',
    description: 'Work on real Google products alongside full-time engineers.\n\nYou will be assigned a meaningful project that contributes to Google\'s core products. You will receive a mentor and work in a fast-paced, collaborative environment.\n\nRequired: Strong CS fundamentals, problem solving skills, and passion for building at scale.',
    stipend: '$8,000/month',
    location: 'Bangalore, India',
    skills: ['Python', 'Java', 'Data Structures', 'Algorithms', 'System Design'],
    applyLink: 'https://careers.google.com/jobs/results/?jex=ENTRY_LEVEL',
    deadline: new Date('2025-06-30'),
    duration: '3 months',
    type: 'onsite',
    featured: true,
  },
  {
    company: 'Microsoft',
    title: 'Frontend Developer Intern',
    description: 'Join the Microsoft Azure team to build world-class web interfaces.\n\nYou will work on React-based dashboards used by millions of developers globally. Strong mentorship and opportunity to convert to full-time.',
    stipend: '₹80,000/month',
    location: 'Hyderabad, India',
    skills: ['React', 'TypeScript', 'CSS', 'Azure', 'GraphQL'],
    applyLink: 'https://careers.microsoft.com',
    deadline: new Date('2025-07-15'),
    duration: '6 months',
    type: 'hybrid',
    featured: true,
  },
  {
    company: 'Razorpay',
    title: 'Backend Engineering Intern',
    description: 'Work on India\'s leading fintech payment infrastructure.\n\nYou will help build and optimize high-throughput transaction systems handling millions of payments daily. Exciting challenges in distributed systems.',
    stipend: '₹60,000/month',
    location: 'Bangalore, India',
    skills: ['Node.js', 'Go', 'MySQL', 'Redis', 'Kafka'],
    applyLink: 'https://razorpay.com/jobs',
    deadline: new Date('2025-08-01'),
    duration: '3 months',
    type: 'onsite',
    featured: true,
  },
  {
    company: 'Flipkart',
    title: 'Data Science Intern',
    description: 'Work with Flipkart\'s data team to build recommendation systems and predictive models.\n\nYou will analyze large datasets, build ML pipelines, and deploy models to production at massive scale.',
    stipend: '₹50,000/month',
    location: 'Remote',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Spark'],
    applyLink: 'https://careers.flipkart.com',
    deadline: new Date('2025-07-30'),
    duration: '2 months',
    type: 'remote',
    featured: true,
  },
  {
    company: 'Swiggy',
    title: 'Full Stack Developer Intern',
    description: 'Build features used by millions of food delivery users across India.\n\nWork across the stack — from React frontends to Node.js microservices. Opportunity for pre-placement offer.',
    stipend: '₹45,000/month',
    location: 'Bangalore, India',
    skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    applyLink: 'https://careers.swiggy.com',
    deadline: new Date('2025-09-01'),
    duration: '3 months',
    type: 'hybrid',
    featured: false,
  },
  {
    company: 'Adobe',
    title: 'UI/UX Design Intern',
    description: 'Design next-generation creative tools at Adobe.\n\nWork closely with product designers and engineers to craft beautiful, intuitive user experiences for Adobe\'s creative suite.',
    stipend: '₹70,000/month',
    location: 'Noida, India',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'CSS'],
    applyLink: 'https://adobe.com/careers',
    deadline: new Date('2025-06-20'),
    duration: '4 months',
    type: 'onsite',
    featured: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Promise.all([Hackathon.deleteMany({}), Internship.deleteMany({})]);
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    await Hackathon.insertMany(hackathons);
    console.log(`✅ Inserted ${hackathons.length} hackathons`);

    await Internship.insertMany(internships);
    console.log(`✅ Inserted ${internships.length} internships`);

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@ajaymasana.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Ajay Masana',
        email: 'admin@ajaymasana.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Admin user created → email: admin@ajaymasana.com | password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('\n🎉 Seed complete! You can now run the app.');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
