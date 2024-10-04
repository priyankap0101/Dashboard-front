import Slider from "react-slick"; // Ensure you have react-slick installed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
  customPaging: (i) => (
    <div
      style={{
        width: "12px",
        height: "18px",
        borderRadius: "50%",
        background: "#FFFFFF",
        cursor: "pointer",
      }}
    />
  ),
  appendDots: (dots) => (
    <div
      style={{
        top: "40%",
        right: "-25rem",
        transform: "translateY(-50%)",
        display: "flex",
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

const SlideCard = ({ subtitle, description, revenueSources, imageSrc }) => {
  // Dynamic styles for responsiveness
  const getResponsiveStyles = () => {
    const isMobile = window.innerWidth < 768;
    return {
      cardContainer: {
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "10px" : "20px",
        background: "linear-gradient(135deg, #8A2BE2, #5A4FCF)",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        color: "#FFFFFF",
        textAlign: "left",
        overflow: "hidden",
        position: "relative",
        height: isMobile ? "260px" : "auto",
      },
      imageStyle: {
        width: isMobile ? "60px" : "120px",
        height: isMobile ? "50px" : "90px",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        position: "absolute",
        top: isMobile ? "40px" : "20px",
        right: "10px",
        objectFit: "cover",
        zIndex: 1,
        transition: "width 0.3s ease, height 0.3s ease",
      },
      contentStyle: {
        paddingRight: isMobile ? "80px" : "140px",
        position: "relative",
      },
      titleStyle: {
        fontSize: isMobile ? "12px" : "22px",
        fontWeight: "bold",
        marginBottom: "5px",
      },
      descriptionStyle: {
        fontSize: isMobile ? "8px" : "16px",
        marginBottom: "10px",
      },
      subtitleStyle: {
        fontSize: isMobile ? "12px" : "20px",
        fontWeight: "600",
        marginBottom: "5px",
      },
      revenueSourceContainer: {
        marginBottom: "10px",
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(2, 1fr)", // Always 2 boxes per row
        gap: isMobile ? "5px" : "15px", // Reduce gap for mobile
      },
      revenueSourceBox: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        padding: isMobile ? "5px" : "10px",
        borderRadius: "10px",
        textAlign: "center",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        width: isMobile ? "100%" : "180px",
        height: isMobile ? "50px" : "70px", // Adjust height for mobile
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      revenueValueStyle: {
        margin: "0",
        fontWeight: "bold",
        fontSize: isMobile ? "10px" : "16px", // Reduce value size for mobile
      },
      revenueLabelStyle: {
        margin: "0",
        fontSize: isMobile ? "8px" : "14px", // Reduce label size for mobile
      },
    };
  };

  const styles = getResponsiveStyles();

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div style={styles.cardContainer}>
      <img src={imageSrc} alt="3D Shape" style={styles.imageStyle} />
      <div style={styles.contentStyle}>
        <h3 style={styles.titleStyle}>Website Analytics</h3>
        <p style={styles.descriptionStyle}>{description}</p>
        <h4 style={styles.subtitleStyle}>{subtitle}</h4>
        <div style={styles.revenueSourceContainer}>
          {revenueSources.map((source) => (
            <div
              key={source.label}
              style={styles.revenueSourceBox}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p style={styles.revenueValueStyle}>{source.value}</p>
              <p style={styles.revenueLabelStyle}>{source.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
