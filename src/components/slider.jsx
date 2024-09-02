import Slider from 'react-slick'; // Ensure you have react-slick installed
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const slides = [
  {
    subtitle: 'Revenue Sources',
    description: 'Total 28.5% Conversion Rate',
    revenueSources: [
      { label: 'Direct', value: 268 },
      { label: 'Organic', value: 890 },
      { label: 'Referral', value: 622 },
      { label: 'Campaign', value: 1200 },
    ],
    imageSrc: 'https://example.com/path/to/your/3d-shape-image.png', // Update with your image URL
  },
  {
    subtitle: 'User Engagement',
    description: 'Total 45.2% Engagement Rate',
    revenueSources: [
      { label: 'New Visitors', value: 500 },
      { label: 'Returning Visitors', value: 780 },
      { label: 'Social Media', value: 420 },
      { label: 'Email Campaign', value: 900 },
    ],
    imageSrc: 'https://example.com/path/to/your/3d-shape-image2.png', // Update with your image URL
  },
  {
    subtitle: 'Sales Performance',
    description: 'Total 33.4% Sales Growth',
    revenueSources: [
      { label: 'Online Sales', value: 950 },
      { label: 'In-Store Sales', value: 680 },
      { label: 'Wholesale', value: 320 },
      { label: 'Subscription', value: 1100 },
    ],
    imageSrc: 'https://example.com/path/to/your/3d-shape-image3.png', // Update with your image URL
  },
];

const SlideCard = ({ subtitle, description, revenueSources, imageSrc }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #8A2BE2, #5A4FCF)', // Violet gradient background
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      width: '100%', // Full width to ensure responsiveness
      maxWidth: '600px', // Increased max-width for better layout
      margin: '0 auto', // Center align cards in slider
      color: '#FFFFFF', // White text color
      textAlign: 'left', // Left-align text
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
    }}
    className="slide-card"
  >
    {/* Left Content - Text */}
    <div style={{ flex: 1, marginRight: '20px' }}>
      {/* Main Title */}
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Website Analytics</h3>
      
      {/* Subtitle */}
      <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{subtitle}</h4>

      {/* Description */}
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>{description}</p>

      {/* Revenue Sources */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {revenueSources.map((source) => (
            <div
              key={source.label}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center', // Center align text inside each source
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <p style={{ margin: '0', fontWeight: 'bold', fontSize: '10px' }}>{source.value}</p>
              <p style={{ margin: '0', fontSize: '10px' }}>{source.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Content - Image */}
    <img
      src={imageSrc}
      alt="3D Shape"
      style={{ width: '120px', height: '120px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
    />
  </div>
);

const buttonStyle = {
  backgroundColor: '#FFFFFF',
  color: '#8A2BE2',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const MySlider = () => (
  <Slider {...sliderSettings}>
    {slides.map((slide, index) => (
      <SlideCard
        key={index}
        subtitle={slide.subtitle}
        description={slide.description}
        revenueSources={slide.revenueSources}
        imageSrc={slide.imageSrc}
      />
    ))}
  </Slider>
);

export default MySlider;
