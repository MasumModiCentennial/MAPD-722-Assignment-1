import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import './Home.css';
import { information, menu, moon } from 'ionicons/icons';

const Home: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [rate, setrate] = useState(0);
  const [regularPay, setRegularPay] = useState(0);
  const [overTimePay, setOverTimePay] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  const [showMenuEvent, setShowMenuEvent] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  function calculatePay() {
    var _regularPay = 0;
    var _totalPay = 0;
    var _overTimePay = 0;
    var _tax = 0;

    if (hours <= 40) {
      _regularPay = hours * rate;
      _totalPay = _regularPay;
    } else {
      _regularPay = 40 * rate;
      _overTimePay = (hours - 40) * rate * 1.5;
      _totalPay = _regularPay + _overTimePay;
    }
    _tax = _totalPay * 0.18;

    setRegularPay(_regularPay);
    setTotalPay(_totalPay);
    setOverTimePay(_overTimePay);
    setTax(_tax);
    displayResults();
  }

  function displayResults() {
    if (totalPay > 0) {
      return (
        <IonList>
          <IonItem>
            <IonLabel color="primary"> Regular Pay: {regularPay}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="primary"> Overtime Pay: {overTimePay}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="primary"> Total Pay: {totalPay}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="danger"> Tax: {tax}</IonLabel>
          </IonItem>
        </IonList>
      );
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pay Calculator</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={(e) =>
                setShowMenuEvent({ open: true, event: e.nativeEvent })
              }
            >
              <IonIcon icon={menu} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonPopover
          isOpen={showMenuEvent.open}
          event={showMenuEvent.event}
          onDidDismiss={(e) =>
            setShowMenuEvent({ open: false, event: undefined })
          }
        >
          <IonContent>
            <IonList>
              <IonItem
                onClick={(e) =>
                  setShowMenuEvent({ open: false, event: undefined })
                }
                routerLink="/About"
              >
                <IonLabel>About</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
        <IonInput
          placeholder="Enter number of hours worked"
          onIonChange={(e: any) => setHours(e.target.value)}
        />
        <IonInput
          placeholder="Enter hourly rate"
          onIonChange={(e: any) => setrate(e.target.value)}
        />
        <IonButton onClick={calculatePay}>Calculate</IonButton>
        <br />
        <br />
        {displayResults()}
      </IonContent>
    </IonPage>
  );
};

export default Home;
