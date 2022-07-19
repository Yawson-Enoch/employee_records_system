import { FooterContent, StyledFooter } from './Footer.styles';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <FooterContent>
        <p>
          &copy; <span>{year} | GROUP 37</span>
        </p>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
