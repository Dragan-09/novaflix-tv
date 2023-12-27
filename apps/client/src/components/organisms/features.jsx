import React, { useEffect, useState } from "react";
import Title from "../atoms/section-title";
import axios from "axios";
import ServiceCard from "../molecules/service-box";

function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const features = await axios.get(
          `${import.meta.env.VITE_API_URL}/features`,
        );
        setFeatures(features.data.data);
        console.log(features.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatures();
  }, []);
  return (
    <div className="services container px-0 sm:px-5 md:px-10 my-5 md:mt-10 w-full 2xl:px-30">
      <div className="services grid grid-cols-6 gap-4 mt-4">
        {features.map(feature => (
          <ServiceCard icon={feature.icon} name={feature.name} />
        ))}
      </div>
    </div>
  );
}

export default Features;
