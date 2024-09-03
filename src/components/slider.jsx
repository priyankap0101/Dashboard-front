import Slider from "react-slick"; // Ensure you have react-slick installed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  customPaging: (i) => (
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "#FFFFFF",
        cursor: "pointer",
      }}
    />
  ),
  appendDots: (dots) => (
    <div
      style={{
        // position: "absolute",
        top: "39%", // Center vertically
        right: "-19rem", // Position from right edge
        transform: "translateY(-50%)", // Center vertically relative to the card
        // zIndex: 2,
        display: "flex",
        // flexDirection: "column",
        gap: "10px",
      }}
    >
      {dots}
    </div>
  ),
};

const slides = [
  {
    subtitle: "Revenue Sources",
    description: "Total 28.5% Conversion Rate",
    revenueSources: [
      { label: "Direct", value: 268 },
      { label: "Organic", value: 890 },
      { label: "Referral", value: 622 },
      { label: "Campaign", value: 1200 },
    ],
    imageSrc: "https://img.freepik.com/premium-vector/world-icon-design-vector-illustration-eps10-graphic_24908-16471.jpg?w=740", // Replace with a valid image URL
  },
  {
    subtitle: "User Engagement",
    description: "Total 45.2% Engagement Rate",
    revenueSources: [
      { label: "New Visitors", value: 500 },
      { label: "Returning Visitors", value: 780 },
      { label: "Social Media", value: 420 },
      { label: "Email Campaign", value: 900 },
    ],
    imageSrc: "https://img.freepik.com/free-vector/green-big-data-sphere-with-binary-numbers-strings_1217-2312.jpg?t=st=1725343099~exp=1725346699~hmac=f4842bfea6d28ddfb544e6a6623206a8d0c8020980d7751711088bae864f7280&w=740", // Replace with a valid image URL
  },
  {
    subtitle: "Sales Performance",
    description: "Total 33.4% Sales Growth",
    revenueSources: [
      { label: "Online Sales", value: 950 },
      { label: "In-Store Sales", value: 680 },
      { label: "Wholesale", value: 320 },
      { label: "Subscription", value: 1100 },
    ],
    imageSrc: "https://img.freepik.com/free-vector/vector-cyber-sphere-blue-big-data-sphere-with-binary-numbers-strings-information-code-structure-representation-cryptographic-analysis-bitcoin-blockchain-transfer_1217-2435.jpg?t=st=1725343143~exp=1725346743~hmac=cc2defe5a0659d7dd145eaaa363f48b371126e8ad78bff497fca8ed84f4b2260&w=740", // Replace with a valid image URL
  },
];

const SlideCard = ({ subtitle, description, revenueSources, imageSrc }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      background: "linear-gradient(135deg, #8A2BE2, #5A4FCF)",
      borderRadius: "15px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      color: "#FFFFFF",
      textAlign: "left",
      overflow: "hidden",
    }}
    className="slide-card"
  >
    {/* Image positioned slightly below the top-right corner */}
    <img
      src={imageSrc}
      alt="3D Shape"
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        position: "absolute",
        top: "70px", // Slightly below the top
        right: "20px",
        objectFit: "cover",
        zIndex: 1,
      }}
    />

    {/* Content */}
    <div style={{ paddingRight: "140px", position: "relative" }}>
      {/* Main Title */}
      <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
        Website Analytics
      </h3>

       {/* Description */}
       <p style={{ fontSize: "16px", marginBottom: "20px" }}>{description}</p>


      {/* Subtitle */}
      <h4 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
        {subtitle}
      </h4>

     

      {/* Revenue Sources */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
          {revenueSources.map((source) => (
            <div
              key={source.label}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <p style={{ margin: "0", fontWeight: "bold", fontSize: "10px" }}>
                {source.value}
              </p>
              <p style={{ margin: "0", fontSize: "10px" }}>{source.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

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
