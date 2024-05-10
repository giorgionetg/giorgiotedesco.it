import Card from '@/Card/Card';
import CardBody from '@/Card/CardBody';
import CardHeader from '@/Card/CardHeader';
import { useState } from 'react';

const uiDescriptions = {
  'crypto-tax':
    'Current app define just Italian taxes on profit with 26% value. You can choose 2 ways to evaluate (Net or Gross amount)',
};

const appLoader = {
  'crypto-tax': (
    <>
      <CryptoTax />
    </>
  ),
};

export const getAmount = (mood, amount, percent) => {
  if (mood) {
    return (amount - amount * percent).toFixed(2);
  } else {
    return amount;
  }
};

export const getTaxes = (mood, amount, percent) => {
  if (mood) {
    return (amount * percent).toFixed(2);
  } else {
    return ((amount / percent) * 100 - amount).toFixed(2);
  }
};

export const getTotal = (mood, amount, percent) => {
  if (mood) {
    return amount;
  } else {
    return ((amount / percent) * 100).toFixed(2);
  }
};

export function CryptoTax() {
  const [amount, setAmount] = useState(2500);
  const [mood, setMood] = useState(true);
  const [percent, setPercent] = useState(mood ? 0.26 : 74);

  const handleAmountChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const handleMoodChange = (e) => {
    e.preventDefault();
    setMood(!mood);
    setPercent(!mood ? 0.26 : 74);
  };

  return (
    <>
      <input onChange={handleAmountChange} value={amount} />
      <button onClick={handleMoodChange}>{mood ? 'Net' : 'Gross'}</button>
      {mood ? (
        <>
          <h3>Net</h3>
          You have cash out <b>{amount}</b> and you should pay{' '}
          <b>{getTaxes(mood, amount, percent)}</b> in taxes. It means you
          allowed to use only <b>{getAmount(mood, amount, percent)}</b>
          <hr />
          Amount: <b>{getAmount(mood, amount, percent)}</b>
          <br />
          Taxes: <b>{getTaxes(mood, amount, percent)}</b>
          <br />
          Total: <b>{getTotal(mood, amount, percent)}</b>
        </>
      ) : (
        <>
          <h3>Gross</h3>
          You would like to cash out <b>{amount}</b> and you should sell for{' '}
          <b>{getTotal(mood, amount, percent)}</b>. It means{' '}
          <b>{getTaxes(mood, amount, percent)}</b> of taxes.
          <hr />
          Amount: <b>{amount}</b>
          <br />
          Taxes: <b>{getTaxes(mood, amount, percent)}</b>
          <br />
          Total: <b>{getTotal(mood, amount, percent)}</b>
        </>
      )}
      <br />
    </>
  );
}

export default function TaxManager() {
  const [description, setDescription] = useState(
    'Please, select a tool from options'
  );

  const [littleApp, setLittleApp] = useState(<></>);

  const handleChange = (e) => {
    e.preventDefault();
    console.log('clicked');
    setDescription(uiDescriptions[e.target.value]);
    setLittleApp(appLoader[e.target.value]);
  };

  return (
    <Card
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <CardHeader color='info'>
        <h1 style={{ fontSize: '34px', marginTop: '.4rem' }}>Tax Manager</h1>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
        <select onChange={(e) => handleChange(e)}>
          <option>Select one</option>
          <option value={'crypto-tax'}>Crypto (Tax)</option>
        </select>
        <br />
        {littleApp}
      </CardBody>
    </Card>
  );
}
