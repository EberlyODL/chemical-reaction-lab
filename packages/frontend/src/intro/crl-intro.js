import { LitElement, html } from '@polymer/lit-element';

class CrlIntro extends LitElement {

  render() {
    return html`
      <style>
        :host {
          position: absolute;
          top: 0;
          left: 0;
          min-height: 100vh;
          width: 100vw;
          z-index: 10;
          overflow-y: scroll;
        }

        .overlay {
          background: rgba(0,0,0, 0.96);
          position: absolute;
          top: 0;
          left: 0;
          min-height: 100vh;
          width: 100vw;
          z-index: -1;
        }

        .content {
          background: white;
          width: 100%;
          max-width: 80vw;
          min-height: 80vh;
          margin: auto;
        }

        .content_container {
          /* padding: 1vw; */
        }

        h1 {
          font-size: calc(4vw);
        }
      </style>

      <div class="overlay"></div>

      <div class="content">
        <div class="content_container">
          <h1>Chemical Reaction Lab</h1>
        </div>
      </div>
    `;
  }

}

customElements.define('crl-intro', CrlIntro);