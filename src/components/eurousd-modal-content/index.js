import { useEffect, useState } from 'react';
import './styles.css';

const EuroUsdModalContent = () => {
  const [euroPrice, setEuroPrice] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const lang = window?.navigator?.language;
  
  useEffect(() => {
    let socket = new WebSocket('wss://stream.tradingeconomics.com/?client=guest:guest');
    function fetchData() {
      console.log('fetching');
      socket.onopen = () => {
        console.log('open connection');
        socket.send(JSON.stringify({ topic: "subscribe", to: "EURUSD:CUR" }));
      };
      socket.onmessage = ({ data }) => {
        console.log('getting data');
        console.log(JSON.parse(data));
        const { dt, price } = JSON.parse(data);
        if (price) {
          setEuroPrice(new Intl.NumberFormat(lang, {style: 'currency', currency: 'EUR'}).format(price));
        }
        if (dt) {
          const formatedDt = new Date(dt).toLocaleString(lang);
          setDateTime(formatedDt);
        }
      };

      socket.onerror = (error) => {
        console.log(error);
        socket.close();
      }
    }
    fetchData();

    return () => {
      socket.close();
    }
  }, [lang]);

  return (
    <div className='eurousd-modal-content'>
      <div className="text-center">
        <h6 className="text-lg">Euro/USD last price</h6>
        <p className="text-2xl font-bold my-4">{euroPrice || 'N/A'}</p>
        <p className="text-sm text-gray-400">Last update: {dateTime}</p>
      </div>
    </div>
  );
};

export default EuroUsdModalContent;
