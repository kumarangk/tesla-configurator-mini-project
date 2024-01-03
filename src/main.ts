import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setupWorker } from 'msw/browser';
import {http, HttpResponse} from 'msw';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


const handlers = [
  http.get('/config/:id', ({ params }) => {

    const configs = {
      "S": {
        configs: [
          {id: 1, description: "Dual Motor All-Wheel Drive", range: 405, speed: 149, price: 74990},
          {id: 2, description: "Plaid - Tri Motor All-Wheel Drive", range: 396, speed: 200, price: 89990},
        ],
        towHitch: false,
        yoke: true
      },
      "X": {
        configs: [
          {id: 1, description: "Dual Motor All-Wheel Drive", range: 348, speed: 149, price: 79990},
          {id: 2, description: "Plaid - Tri Motor All-Wheel Drive", range: 333, speed: 149, price: 94990},
        ],
        towHitch: true, // costs $1,000
        yoke: true, // costs $1,000
      },
      "C" : {
        configs: [
          {id: 1, description: "Rear Wheel Drive", range: 250, speed: 110, price: 60990},
          {id: 2, description: "Dual Motor All-Wheel Drive", range: 340, speed: 112, price: 79990},
          {id: 3, description: "Cyberbeast - Tri Motor All-Wheel Drive", range: 320, speed: 130, price: 99990},
        ],
        towHitch: true, // costs $1,000
        yoke: true, // costs $1,000
      },
      "3": {
        configs: [
          {id: 1, description: "Rear-Wheel Drive", range: 272, speed: 140, price: 38990},
          {id: 2, description: "Long Range - Dual Motor All-Wheel Drive", range: 333, speed: 145, price: 45990},
          {id: 3, description: "Performance - Dual Motor All-Wheel Drive", range: 315, speed: 162, price: 50990},
        ],
        towHitch: false,
        yoke: false,
      },
      "Y": {
        configs: [
          {id: 1, description: "Rear-Wheel Drive", range: 260, speed: 135, price: 43990},
          {id: 2, description: "Long Range - Dual Motor All-Wheel Drive", range: 330, speed: 135, price: 48990},
          {id: 3, description: "Performance - Dual Motor All-Wheel Drive", range: 303, speed: 155, price: 52490},
        ],
        towHitch: true,
        yoke: false,
      }
    };
    // @ts-ignore
    return HttpResponse.json(configs[params.id.toUpperCase()]);
  }),
  http.get('/models', ({ request, params, cookies }) => {
    return HttpResponse.json([
      { code: "S",
        description: "Model S",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 0},
          {code: "black", description: "Solid Black", price: 0},
          {code: "blue", description: "Deep Blue Metallic", price: 0},
          {code: "grey", description: "Stealth Grey", price: 0},
          {code: "red", description: "Ultra Red", price: 0}
        ]
      },
      { code: "X",
        description: "Model X",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 0},
          {code: "black", description: "Solid Black", price: 0},
          {code: "blue", description: "Deep Blue Metallic", price: 0},
          {code: "grey", description: "Stealth Grey", price: 0},
          {code: "red", description: "Ultra Red", price: 0}
        ]
      },
      { code: "C",
        description: "Cybertruck",
        colors: [
          {code: "grey", description: "Stainless Steel", price: 0},
          {code: "black", description: "Satin Black", price: 6500},
          {code: "white", description: "Satin White", price: 6500}
        ]
      },
      { code: "3",
        description: "Model 3",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 1000},
          {code: "black", description: "Solid Black", price: 1500},
          {code: "blue", description: "Deep Blue Metallic", price: 1000},
          {code: "grey", description: "Midnight Silver Metallic", price: 0},
          {code: "red", description: "Red Multi-Coat", price: 2000}
        ]
      },
      { code: "Y",
        description: "Model Y",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 1000},
          {code: "black", description: "Solid Black", price: 2000},
          {code: "blue", description: "Deep Blue Metallic", price: 1000},
          {code: "grey", description: "Midnight Silver Metallic", price: 0},
          {code: "red", description: "Red Multi-Coat", price: 2000}
        ]
      }

    ]);
  }),
];
export const worker = setupWorker(...handlers);
worker.start();

