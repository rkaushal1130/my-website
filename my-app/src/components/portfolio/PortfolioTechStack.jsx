import React, { useState, useMemo } from 'react';
import Container from '../common/Container';

// =========================================================================
// HIGH-FIDELITY SVG LOGOS FOR ALL TECHNOLOGIES
// =========================================================================

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 180 180" className="w-full h-full">
    <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
      <circle cx="90" cy="90" fill="black" r="90"/>
    </mask>
    <g mask="url(#mask0_next)">
      <circle cx="90" cy="90" data-circle="true" fill="black" r="90" stroke="white" strokeWidth="6"/>
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white"/>
      <rect fill="white" height="72" width="12" x="115" y="54"/>
    </g>
  </svg>
);

const VueIcon = () => (
  <svg viewBox="0 0 261.76 226.69" className="w-full h-full">
    <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41B883"/>
    <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495E"/>
  </svg>
);

const AngularIcon = () => (
  <svg viewBox="0 0 250 250" className="w-full h-full">
    <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031"/>
    <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2" fill="#C3002F"/>
    <path d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M142,135.4H108l17-42.4L142,135.4z" fill="#FFFFFF"/>
  </svg>
);

const TypescriptIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <rect width="128" height="128" rx="16" fill="#3178C6"/>
    <path d="M68.5 86.8c1.8 1.6 4.1 2.8 6.9 3.5 2.8.8 5.7 1.1 8.7 1.1 4.7 0 8.4-.9 11.2-2.8 2.8-1.8 4.2-4.6 4.2-8.3 0-2.3-.6-4.2-1.8-5.7-1.2-1.5-2.9-2.7-5.1-3.6-2.2-.9-5-1.7-8.4-2.5-4.4-1-8.1-2.1-11.2-3.3-3.1-1.2-5.5-2.9-7.3-5.2-1.8-2.3-2.7-5.3-2.7-9.1 0-4.3 1.3-8 3.8-11.2 2.5-3.2 6-5.6 10.4-7.3 4.4-1.7 9.5-2.5 15.3-2.5 4.3 0 8.3.5 12 1.6 3.7 1.1 6.8 2.6 9.4 4.5l-5.7 9.4c-2.3-1.6-4.8-2.7-7.6-3.6-2.8-.8-5.6-1.3-8.4-1.3-3.8 0-6.9.8-9.2 2.3-2.3 1.5-3.5 3.8-3.5 6.8 0 2.2.6 3.9 1.8 5.2 1.2 1.3 2.9 2.4 5.1 3.2 2.2.8 5.1 1.6 8.7 2.4 4.5 1 8.3 2.1 11.5 3.4 3.2 1.3 5.7 3.1 7.6 5.5 1.9 2.4 2.8 5.6 2.8 9.6 0 4.6-1.3 8.6-3.9 11.9-2.6 3.3-6.2 5.8-10.9 7.5-4.7 1.7-10.1 2.6-16.3 2.6-5.5 0-10.4-.7-14.8-2.2-4.4-1.5-8.2-3.7-11.4-6.5l6.7-9.2zM21 40.5h37.4v10.2H45v48H32.8v-48H21V40.5z" fill="#FFFFFF"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/>
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 256 289" className="w-full h-full">
    <path d="M128 0L256 73.9V221.7L128 288.6L0 221.7V73.9L128 0Z" fill="#333333"/>
    <path d="M128 13.7L242.4 79.5V213.9L128 274.9L13.6 213.9V79.5L128 13.7Z" fill="#539E43"/>
    <path d="M136.3 75.3C132.8 73.2 128.7 72.1 124.6 72.1C112.5 72.1 104.4 79.7 104.4 90.9C104.4 117.8 147.2 110.1 147.2 135.5C147.2 148.6 136.7 156.4 122.9 156.4C114.7 156.4 107.1 153.2 101.4 148L108.7 137.6C112.9 141.6 117.7 144.1 123.3 144.1C130.6 144.1 135.1 139.9 135.1 134.4C135.1 108.6 92.4 115.6 92.4 90.9C92.4 72.5 106.8 60 124.7 60C132.2 60 139.6 62.5 145.4 67.2L136.3 75.3Z" fill="#FFFFFF"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 110 110" className="w-full h-full">
    <path d="M54.5 0C24.4 0 26.2 13.1 26.2 13.1L26.3 26.7H55v4H15.4S0 29 0 59.2c0 30.1 13.4 29 13.4 29h8v-11.4s-.4-13.4 13.2-13.4h28.1s12.8.2 12.8-12.4V13.1S78.5 0 54.5 0zm-15 9.1c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" fill="#3776AB"/>
    <path d="M55.5 110c30.1 0 28.3-13.1 28.3-13.1l-.1-13.6H55v-4h39.6s15.4 1.7 15.4-28.5c0-30.1-13.4-29-13.4-29h-8v11.4s.4 13.4-13.2 13.4H47.3S34.5 46.4 34.5 59v27.9s-3 13.1 21 13.1zm15-9.1c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="#FFD43B"/>
  </svg>
);

const GoIcon = () => (
  <svg viewBox="0 0 256 100" className="w-full h-full">
    <path d="M46.7 41.3c-.9-3.9-3.8-6.4-8.8-6.4-6.2 0-10.9 4.8-10.9 12.3 0 7.8 4.7 12.7 11.2 12.7 4.2 0 7.4-2.1 8.8-5.8H35.4v-8.8h21.8c.2 1.3.3 2.7.3 4.1 0 13.1-8.5 22.8-22.3 22.8C15.6 72.2 5 61.2 5 47.2 5 33.3 15.6 22.3 35.2 22.3c10.4 0 18.5 4.9 22.2 13.7l-10.7 5.3zM101.4 47.2c0 14.1-10.7 25-25.2 25s-25.2-10.9-25.2-25 10.7-25 25.2-25 25.2 10.9 25.2 25zm-38.3 0c0 8.1 5.7 13.6 13.1 13.6 7.4 0 13.1-5.5 13.1-13.6s-5.7-13.6-13.1-13.6c-7.4 0-13.1 5.5-13.1 13.6z" fill="#00ADD8"/>
  </svg>
);

const RustIcon = () => (
  <svg viewBox="0 0 106 106" className="w-full h-full" fill="#DEA584">
    <path d="M53 0a53 53 0 100 106 53 53 0 000-106zm0 10a43 43 0 0140 27.5l-7.5 3a35 35 0 00-65 0l-7.5-3A43 43 0 0153 10zm-35.8 43a35 35 0 001.3 9.5l-7.7 2.2a43 43 0 010-23.4l7.7 2.2A35 35 0 0017.2 53zm71.6 0a35 35 0 00-1.3-9.5l7.7-2.2a43 43 0 010 23.4l-7.7-2.2a35 35 0 001.3-9.5zm-53 19.5a35 35 0 0065 0l7.5 3a43 43 0 01-80 0l7.5-3zM40 38h26a10 10 0 010 20H52v12H40V38zm12 12h14a2 2 0 000-4H52v4z"/>
  </svg>
);

const JavaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <path d="M8.8 19.3c3.2.2 6.5-.4 8.7-2.2-.4.4-.9.7-1.4 1-2.4 1.1-5.3 1.3-7.3 1.2zm-1.6 1.8c4.3.4 9.1-.1 12.3-2.6-1.1.7-2.2 1.3-3.5 1.7-2.7.9-6 .9-8.8.9zm13.1-6.7c-.5-.7-1.4-1-2.1-1.3-.8-.3-1.6-.6-2.5-.7.8-.5 1.7-.8 2.6-.9 1.1-.1 2.3.1 3 .8.7.6.7 1.7.3 2.5-.3.8-.8 1.4-1.4 2 1.1-.7 1.8-1.8 1.8-3 .1-1.2-.6-2.1-1.7-2.4zm-7.6-5.8c-.8.8-1.1 1.9-1.2 3 .5-.8 1.2-1.4 2-1.9.9-.5 2-.8 3-.9-.9-.7-2.3-.9-3.8-.2zm-3.2 8.7c3.4.3 6.9-.3 9.4-2.2-.4.4-.9.7-1.5 1-2.6 1.1-5.6 1.3-7.9 1.2z" fill="#E76F00"/>
    <path d="M12.5 2.1c.3 1.4-.4 2.8-1.2 3.9-.8 1.1-1.8 2-2.5 3.2-.4.7-.7 1.6-.5 2.4.2.8.9 1.3 1.7 1.4.9.1 1.7-.3 2.5-.7 1.3-.7 2.4-1.6 3.4-2.6-1 2.2-2.8 4-4.8 5.2-1.6.9-3.4 1.5-5.2 1.2-1.6-.3-2.9-1.5-3.3-3.1-.4-1.6.2-3.3 1.2-4.6 1.1-1.4 2.5-2.6 3.8-3.8 1.6-1.4 3.4-2.8 4.9-2.5z" fill="#5382A1"/>
  </svg>
);

const CsharpIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path d="M115.4 30.7L66.7 2.6c-1.7-1-3.7-1-5.3 0L12.6 30.7c-1.7 1-2.6 2.7-2.6 4.6v56.3c0 1.9 1 3.6 2.6 4.6l48.7 28.1c1.7 1 3.7 1 5.3 0l48.7-28.1c1.7-1 2.6-2.7 2.6-4.6V35.3c.1-1.9-.9-3.6-2.5-4.6z" fill="#239120"/>
    <path d="M64 24.8L27.6 45.8v42.4L64 109.2l36.4-21V45.8L64 24.8z" fill="#68217A"/>
    <path d="M64 45c-11.6 0-21 9.4-21 21s9.4 21 21 21c7.7 0 14.5-4.1 18.2-10.4l-7.3-4.2c-2.3 4.3-6.8 7.2-10.9 7.2-7.5 0-13.6-6.1-13.6-13.6S56.5 52.4 64 52.4c4.1 0 8.6 2.9 10.9 7.2l7.3-4.2C78.5 49.1 71.7 45 64 45z" fill="#FFFFFF"/>
  </svg>
);

const AwsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <path d="M6.9 11.2c0-.5.4-.8.9-.8.4 0 .7.2.9.5l1.6 2.5c.2.3.5.5.9.5.4 0 .8-.2.9-.6l2.1-4.7c.2-.4.6-.7 1.1-.7.7 0 1.2.6 1.2 1.3 0 .3-.1.6-.3.9l-3 6.3c-.2.5-.7.8-1.2.8-.5 0-1-.3-1.2-.7L8.9 14l-1.3 2c-.2.3-.5.5-.9.5-.5 0-.9-.3-1.1-.7l-2.4-5.3c-.2-.4-.3-.7-.3-1 0-.7.6-1.3 1.3-1.3.5 0 .9.3 1.1.7l1.6 4.3z" fill="#FFFFFF"/>
    <path d="M2.5 16.5c4.7 3.5 11.8 3.8 17.5.8.5-.3 1.2.2.8.8-5.3 4.6-13.8 4.3-18.9-.7-.4-.5 0-1.2.6-.9z" fill="#FF9900"/>
    <path d="M20.9 15.6c-.6.8-2 1.4-2.8 1.6-.3 0-.4-.2-.2-.4.7-.6 1.5-1.5 1.8-2.5.1-.3.4-.2.5.1.2.4.8 1 1.2 1.3.3.2.2.4-.1.4-.4-.1-.4-.5-.4-.5z" fill="#FF9900"/>
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#2496ED">
    <path d="M13.98 6.47h2.15v2.09h-2.15V6.47zm-2.88 0h2.15v2.09H11.1V6.47zm-2.87 0h2.15v2.09H8.23V6.47zm8.63 2.87h2.15v2.09h-2.15V9.34zm-2.88 0h2.15v2.09h-2.15V9.34zm-2.88 0h2.15v2.09H11.1V9.34zm-2.87 0h2.15v2.09H8.23V9.34zm-2.88 0h2.15v2.09H5.35V9.34zM23.99 12.3c-.35-1.92-1.74-2.73-2.7-2.82-.44-.04-.88.04-1.29.23-.29-.77-.87-1.34-1.59-1.63l-.44-.18-.29.35c-.71.86-1.12 1.95-1.17 3.07H.78c-.28 0-.5.22-.5.5 0 2.21.65 4.35 1.87 6.18C3.89 20.61 6.57 22 9.5 22c7.63 0 13.56-4.99 14.49-12.06v.01l-.01.01v.01l.01.01v.01c0-.56 0-.89 0-.89v-.8h-.01z"/>
  </svg>
);

const KubernetesIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#326CE5">
    <path d="M11.96 0L2.1 5.67v11.34L11.96 22.7l9.86-5.69V5.67L11.96 0zm7.84 16.03L12 20.53l-7.8-4.5V6.97L12 2.47l7.8 4.5v9.06z"/>
    <path d="M12 6.5l3.5 2v4l-3.5 2-3.5-2v-4l3.5-2zm0 1.5l-2.2 1.25v2.5L12 13l2.2-1.25v-2.5L12 8z"/>
  </svg>
);

const TerraformIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#7B42BC">
    <path d="M14.6 9.4L9.8 6.7v5.5l4.8 2.7V9.4zm5.1-2.9L15 3.8v5.5l4.7 2.7V6.5zm-10.2 6L4.7 9.8v5.5l4.8 2.7v-5.5zm5.1 2.9l-4.8-2.7v5.5l4.8 2.7v-5.5z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const AzureIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#0089D6">
    <path d="M5.4 20.6l6.8-17.2h6.4L5.4 20.6zM12.9 8.2l-3.3 6.3 3.6 6.1H23L12.9 8.2zM1.8 17.6l2.9-4.8 5.7 7.8H4.6l-2.8-3z"/>
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#336791">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#47A248">
    <path d="M12 1.5s-5.8 4.7-5.8 11.2c0 4.6 3.4 8.2 5.8 9.8 2.4-1.6 5.8-5.2 5.8-9.8C17.8 6.2 12 1.5 12 1.5zm.3 18.2V4.4c1.9 2.5 3.8 5.7 3.8 8.3 0 3.3-2.1 6.1-3.8 7z"/>
  </svg>
);

const RedisIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#DC382D">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.3L3.8 6.2 12 2.1l8.2 4.1L12 10.3zM2 12l10 5 10-5-2-1-8 4-8-4-2 1zm0 5l10 5 10-5-2-1-8 4-8-4-2 1z"/>
  </svg>
);

const SupabaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#3ECF8E">
    <path d="M21.36 11.08h-9.5V1.28c0-.76-.87-1.19-1.46-.72L1.87 10.87c-.55.44-.39 1.33.31 1.54l8.32 2.49v8.32c0 .76.87 1.19 1.46.72l8.53-10.31c.55-.44.39-1.33-.31-1.54l-.82-.21z"/>
  </svg>
);

const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
    <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0010.748.74a6.046 6.046 0 00-5.772 3.99 6.04 6.04 0 00-4.006 2.9 6.05 6.05 0 00.73 7.17 5.98 5.98 0 00.516 4.91 6.05 6.05 0 006.51 2.9 6.06 6.06 0 004.508 1.27 6.05 6.05 0 005.772-3.99 6.04 6.04 0 004.006-2.9 6.05 6.05 0 00-.73-7.17zm-8.878 11.2a4.52 4.52 0 01-2.99-1.12l.14-.08 4.97-2.87a.78.78 0 00.39-.68v-6.99l2.12 1.22a.08.08 0 01.04.07v5.92a4.53 4.53 0 01-4.67 4.53zM3.86 17.5a4.53 4.53 0 01-.65-3.12l.14.09 4.97 2.87a.78.78 0 00.78 0l6.05-3.5v2.45a.08.08 0 01-.03.07l-5.13 2.96a4.53 4.53 0 01-6.13-1.82zm-1.34-8.8a4.53 4.53 0 012.34-2.01v5.89a.78.78 0 00.39.68l6.05 3.5-2.12 1.22a.08.08 0 01-.07 0L4.31 15a4.53 4.53 0 01-1.79-6.3zM18.8 9.94l-6.05-3.5 2.12-1.22a.08.08 0 01.07 0l5.13 2.96a4.53 4.53 0 01-1.27 8.31V10.62a.78.78 0 00-.39-.68h.39zm2.68-2.65a4.53 4.53 0 01.65 3.12l-.14-.09-4.97-2.87a.78.78 0 00-.78 0L10.19 11V8.55a.08.08 0 01.03-.07l5.13-2.96a4.53 4.53 0 016.13 1.82zM12 13.8l-2.73-1.58 2.73-1.58 2.73 1.58L12 13.8z"/>
  </svg>
);

const TensorflowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF6F00">
    <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z"/>
    <path d="M11 7h2v10h-2zM7 9h10v2H7z"/>
  </svg>
);

const PytorchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#EE4C2C">
    <path d="M13.2 2.1a1 1 0 00-1.4 0l-1.3 1.3a7.5 7.5 0 00-2 4.9c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-1.8-.7-3.5-2-4.9l-1.3-1.3a1 1 0 00-1.4 0l-1.3 1.3c.9 1 1.5 2.3 1.5 3.7 0 3-2.5 5.5-5.5 5.5s-5.5-2.5-5.5-5.5c0-1.4.6-2.7 1.5-3.7l1.4-1.3zM17 3.5a1 1 0 11-2 0 1 1 0 012 0z"/>
  </svg>
);

const Html5Icon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#E34F26">
    <path d="M2.5 1l1.7 19.3L12 23l7.8-2.7L21.5 1H2.5zm15.1 5.3l-.2 2.2H8.3l.2 2.3h7.7l-.6 6.5-3.6 1-3.6-1-.2-2.8h2.2l.1 1.4 1.5.4 1.5-.4.2-2H6.2L5.6 4h12.2l-.2 2.3z"/>
  </svg>
);

const ReactNativeIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#02569B">
    <path d="M14.3 2L4 12.3l3.6 3.6L21.5 2h-7.2zm0 12.8L10.4 18.7 14.3 22.6h7.2l-7.2-7.8z" fill="#0175C2"/>
    <path d="M7.6 15.9l4.8-4.8 3.9 3.9-4.8 4.8-3.9-3.9z" fill="#54C5F8"/>
  </svg>
);

const SwiftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#F05138">
    <path d="M21.7 15.6c-.2-.4-.4-.8-.7-1.1-.8-.9-1.9-1.5-3-1.8-1.5-.4-3.1-.2-4.5.4 1.7-.9 3.2-2.3 4.2-3.9.7-1.1 1.1-2.4 1.2-3.7 0-.3-.3-.6-.6-.5-.8.3-1.5.8-2.2 1.3-1.8 1.4-3.1 3.2-4 5.2-.6 1.4-1 2.8-1.1 4.3 0 .4-.3.7-.6.8-1 .4-2.1.6-3.2.5-.5 0-.8.4-.7.8.2 1.5.9 2.9 2 4 1.3 1.2 3 1.9 4.8 2 1.7.1 3.4-.4 4.8-1.4 1.6-1.1 2.7-2.7 3.3-4.5.3-.8.5-1.7.6-2.6 0-.3-.1-.6-.4-.7z"/>
  </svg>
);

const KotlinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path d="M24 24H0V0h24L12 12l12 12z" fill="#7F52FF"/>
    <path d="M0 24l12-12L24 0H0v24z" fill="#C711E1"/>
    <path d="M0 24l12-12L0 0v24z" fill="#E24462"/>
  </svg>
);

// =========================================================================
// 30 MASTER TECH STACK ITEMS (Exact Match with Target Layout)
// =========================================================================

const TECH_TILES = [
  // ROW 1
  { name: 'React', icon: ReactIcon, category: 'frontend' },
  { name: 'Next.js', icon: NextjsIcon, category: 'frontend' },
  { name: 'Vue.js', icon: VueIcon, category: 'frontend' },
  { name: 'Angular', icon: AngularIcon, category: 'frontend' },
  { name: 'TypeScript', icon: TypescriptIcon, category: 'frontend' },
  { name: 'Tailwind CSS', icon: TailwindIcon, category: 'frontend' },

  // ROW 2
  { name: 'Node.js', icon: NodeIcon, category: 'backend' },
  { name: 'Python', icon: PythonIcon, category: 'backend' },
  { name: 'Go', icon: GoIcon, category: 'backend' },
  { name: 'Rust', icon: RustIcon, category: 'backend' },
  { name: 'Java', icon: JavaIcon, category: 'backend' },
  { name: 'C#', icon: CsharpIcon, category: 'backend' },

  // ROW 3
  { name: 'AWS', icon: AwsIcon, category: 'cloud' },
  { name: 'Docker', icon: DockerIcon, category: 'cloud' },
  { name: 'Kubernetes', icon: KubernetesIcon, category: 'cloud' },
  { name: 'Terraform', icon: TerraformIcon, category: 'cloud' },
  { name: 'GitHub Actions', icon: GithubIcon, category: 'cloud' },
  { name: 'Azure', icon: AzureIcon, category: 'cloud' },

  // ROW 4
  { name: 'PostgreSQL', icon: PostgresIcon, category: 'database' },
  { name: 'MongoDB', icon: MongoIcon, category: 'database' },
  { name: 'Redis', icon: RedisIcon, category: 'database' },
  { name: 'Supabase', icon: SupabaseIcon, category: 'database' },
  { name: 'OpenAI', icon: OpenAIIcon, category: 'ai' },
  { name: 'TensorFlow', icon: TensorflowIcon, category: 'ai' },

  // ROW 5
  { name: 'PyTorch', icon: PytorchIcon, category: 'ai' },
  { name: 'HTML5', icon: Html5Icon, category: 'frontend' },
  { name: 'React Native', icon: ReactNativeIcon, category: 'mobile' },
  { name: 'Flutter', icon: FlutterIcon, category: 'mobile' },
  { name: 'Swift', icon: SwiftIcon, category: 'mobile' },
  { name: 'Kotlin', icon: KotlinIcon, category: 'mobile' },
];

const PortfolioTechStack = () => {
  return (
    <section id="tech-stack" className="py-20 sm:py-28 bg-[#030303] relative overflow-hidden font-sans">
      {/* Background Volumetric Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#FF1F26]/7 rounded-full blur-[140px] pointer-events-none" />

      <Container size="wide" className="relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. HEADER WITH GLOWING DIVIDER LINE */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-4">
          
          {/* Eyebrow with horizontal glowing line */}
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>TECH STACK</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Technology <span className="text-[#FF1F26] text-glow">Stack</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto font-normal leading-relaxed">
            40+ technologies and frameworks to build scalable, performant, and future-proof solutions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. 6-COLUMN GRID TILES (Balanced Proportions) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 max-w-[1080px] mx-auto">
          {TECH_TILES.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="group relative rounded-2xl bg-[#09090D] border border-white/[0.08] hover:border-[#FF1F26]/60 hover:bg-[#0E0E14] hover:shadow-[0_0_22px_rgba(255,31,38,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center p-4 sm:p-5 h-26 sm:h-30 text-center cursor-pointer select-none"
              >
                {/* Subtle Ambient Red Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-[#FF1F26]/0 group-hover:bg-[#FF1F26]/5 transition-colors duration-300 pointer-events-none" />

                {/* Tech Logo Icon */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Icon />
                </div>

                {/* Tech Label */}
                <span className="text-xs sm:text-[13px] font-semibold text-white/95 group-hover:text-[#FF3030] transition-colors relative z-10 truncate max-w-full px-1">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default PortfolioTechStack;
