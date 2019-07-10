import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import { store } from '../state/state';
import { observe, autorun } from 'mobx';

class CrlIntro extends LitElement {

  static get properties() {
    return {
      active: { type: Boolean }
    };
  }

  constructor() {
    super()
    autorun(() => {
      this.active = (store.activePage === 'intro')
    })
  }

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    this.__activeChanged(this.active)
    return html`
      <style>
        :host,
        .wrapper {
          display: flex;
          flex-direction: column;
        }

        .overlay {
          background: rgba(0,0,0, 0.8);
          display: flex;
          position: fixed;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .dialog {
          background-color: white;
          display: flex;
          flex-direction: column;
          width: auto;
          /* 100 height minus margin and padding */
          min-height: calc(100vh - 6vw);
          z-index: 2;
          margin: 2vw;
          padding: 1vw;
        }

        .content {
          display: flex;
          flex: 1 1 auto;
        }

        .footer {
          display: flex;
        }

        .cta-button {
          background: #2c76c7;
          color: white;
          width: 100vw;
          height: calc(3em + 1vw);
          font-size: calc(16px + 1vw);
        }

        .cta-button:hover,
        .cta-button:focus {
          background: #0f7ff9;
        }
      </style>

      <div class="wrapper" ?aria-hidden="${this.active}" tabindex="${this.active?'0':''}">

        <div class="overlay" @click="${this.__enterLabClicked}"></div>

        <div class="dialog">
          <div class="content">
            <h1>Chemical Reaction Lab</h1>
            <img src="/assets/screenshot.png">
          </div>
          <div class="footer">
            <paper-button raised class="cta-button" @click="${this.__enterLabClicked}">Start Simulation</paper-button>
          </div>
        </div>

      </div>

    `;
  }

  __enterLabClicked(e) {
    store.activePage = 'scene1'
  }

  async __activeChanged(active) {
    // await for the dom to complete
    await this.renderComplete
    const wrapper = this.shadowRoot.querySelector('.wrapper')
    const overlay = this.shadowRoot.querySelector('.overlay')
    const dialog = this.shadowRoot.querySelector('.dialog')
    if (!active) {
      wrapper.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], { duration: 600, fill: 'forwards' })
      dialog.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-5vw)' },
      ], { duration: 600, fill: 'forwards' })
    }
  }
}

customElements.define('crl-intro', CrlIntro);