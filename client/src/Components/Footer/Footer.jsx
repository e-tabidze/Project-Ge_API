import React from "react";

import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WebIcon from "@mui/icons-material/Web";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";

import goldenLogo from "../../Assets/logo-gold.png";
import classes from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_content}>
        <div className={classes.footer_content_section}>
          <img
            src={goldenLogo}
            className={classes.footer_content_section_logo}
          />
          <div className={classes.footer_content_section_copyright}>
            © 2021 gegold.ge
          </div>
          <div className={classes.footer_content_section_line}>
            ძვირფასეულობის ონლაინ ფლატფორმა
          </div>
        </div>
        <div className={classes.footer_content_section}>
          <li>
            <AccountCircleIcon fontSize="small" style={{ color: "#bb9654" }} />
            <p>ჩემი გვერდი</p>
          </li>
          <li>
            <SendIcon fontSize="small" style={{ color: "#bb9654" }} />
            <p>სამომხმარებლო წესები და პირობები</p>
          </li>
          <li>
            <WebIcon fontSize="small" style={{ color: "#bb9654" }} />
            <p>რეკლამის განთავსება</p>
          </li>
        </div>
        <div className={classes.footer_content_section}>
          <li>
            <div>კონტაქტი</div>
          </li>
          <li>
            <LocalPhoneSharpIcon
              fontSize="small"
              style={{ color: "#001e42" }}
            />
            <span>+995 555 181 182</span>
          </li>
          <li>
            <MailOutlineSharpIcon
              fontSize="small"
              style={{ color: "#001e42" }}
            />
            <span>support@gegold.ge</span>
          </li>
          <li>
            <FacebookRoundedIcon
              fontSize="small"
              style={{ color: "#001e42", marginRight: "12px" }}
            />
            <WhatsappOutlinedIcon
              fontSize="small"
              style={{ color: "#001e42", marginRight: "12px" }}
            />
            <LinkedInIcon fontSize="small" style={{ color: "#001e42" }} />
          </li>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
