import React, { useState } from 'react';
import './Subscription.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { buySubscription } from '../../service/paymentService';
import { getUserInfoRequest } from '../../features/user/userSlice';

const Subscription = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsAnnually(!isAnnually);
  };

  const { userInfo } = useSelector((state) => state.user);

  const handleBuyNow = async (subscription) => {
    const userId = userInfo?.user?.id; // Assuming userInfo contains user id
    const payload = {
      id: userId,
      subscription_name: subscription.name,
      amount: subscription.amount,
      storage: subscription.storage,
      connection_allowed: subscription.connections,
      payment_status: 'Completed',
    };

    try {
      await buySubscription(payload);
      dispatch(getUserInfoRequest(userId))
      alert('Payment successful!'); // Display success message or redirect user
    } catch (error) {
      alert('Payment failed. Please try again.'); // Display error message
    }
  };

  const renderSubscriptionPlans = () => (
    <div className="cards">
      <div className={`subscription_card ${!isAnnually ? 'shadow' : ''}`}>
        <ul>
          <li className="pack">Basic</li>
          <li id="basic" className="price bottom-bar">
            {isAnnually ? '$199.99' : '$19.99'}
          </li>
          <li className="bottom-bar">1 GB Storage</li>
          <li className="bottom-bar">10 Connections</li>
          <li>
            <button
              className="btn"
              onClick={() => handleBuyNow({
                name: 'Basic',
                amount: isAnnually ? 199.99 : 19.99,
                storage: 1,
                connections: 10,
              })}
            >
              Buy Now
            </button>
          </li>
        </ul>
      </div>
      <div className={`subscription_card ${!isAnnually ? 'active' : 'active'}`}>
        <ul>
          <li className="pack">Standard</li>
          <li id="professional" className="price bottom-bar">
            {isAnnually ? '$249.99' : '$29.99'}
          </li>
          <li className="bottom-bar">5 GB Storage</li>
          <li className="bottom-bar">50 Connections</li>
          <li>
            <button
              className="btn active-btn"
              onClick={() => handleBuyNow({
                name: 'Standard',
                amount: isAnnually ? 249.99 : 29.99,
                storage: 5,
                connections: 50,
              })}
            >
              Buy Now
            </button>
          </li>
        </ul>
      </div>
      <div className={`subscription_card ${!isAnnually ? 'shadow' : ''}`}>
        <ul>
          <li className="pack">Premium</li>
          <li id="master" className="price bottom-bar">
            {isAnnually ? '$399.99' : '$49.99'}
          </li>
          <li className="bottom-bar">20 GB Storage</li>
          <li className="bottom-bar">Unlimited Connections</li>
          <li>
            <button
              className="btn"
              onClick={() => handleBuyNow({
                name: 'Premium',
                amount: isAnnually ? 399.99 : 49.99,
                storage: 20,
                connections: 10000000,
              })}
            >
              Buy Now
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderActiveSubscription = () => (
    <div className="subscription_card">
      <ul>
        {/* <li className="pack">Your Active Subscription</li> */}
        <li>{userInfo.paymentInfo.subscription_name}</li>
        <li className="price bottom-bar">
          ${userInfo.paymentInfo.amount}
        </li>
        <li className="bottom-bar">Storage: {userInfo.paymentInfo.storage} GB</li>
        <li className="bottom-bar">Connections Allowed: {userInfo.paymentInfo.connection_allowed}</li>
        <li>
          <button className="btn active-btn">Manage Subscription</button>
        </li>
      </ul>
    </div>
  );

  return (
    <div>
      <header>
       { userInfo && userInfo.paymentInfo && userInfo.paymentInfo.payment_status === 'Completed' ?  <h1>Your active Subscription</h1> : <h1>Our Pricing</h1> }
        {/* <div className="toggle">
          <label>Annually </label>
          <div className="toggle-btn">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              checked={isAnnually}
              onChange={handleToggle}
            />
            <label className="sub" htmlFor="checkbox">
              <div className="circle"></div>
            </label>
          </div>
          <label> Monthly</label>
        </div> */}
      </header>
      {userInfo && userInfo.paymentInfo && userInfo.paymentInfo.payment_status === 'Completed'
        ? renderActiveSubscription()
        : renderSubscriptionPlans()}
    </div>
  );
};

export default Subscription;
