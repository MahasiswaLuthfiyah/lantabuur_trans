import * as React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAttachment = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>File Upload</h1>
              <form
                name="file-upload"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* Required hidden field for Netlify */}
                <input type="hidden" name="form-name" value="file-upload" />
                <div hidden>
                  <label htmlFor="bot-field">
                    Don’t fill this out:
                    <input
                      id="bot-field"
                      name="bot-field"
                      onChange={this.handleChange}
                    />
                  </label>
                </div>

                <div className="field">
                  <label className="label" htmlFor="name">
                    Your name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      id="name"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="attachment">
                    Upload file
                  </label>
                  <div className="file">
                    <div className="file-label">
                      <input
                        id="attachment"
                        className="file-input"
                        type="file"
                        name="attachment"
                        onChange={this.handleAttachment}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file…</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
