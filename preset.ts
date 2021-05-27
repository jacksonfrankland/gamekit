import { Preset } from 'apply';

Preset.setName('GameKit');
Preset.editNodePackages().add('pixi.js', '^6.0.4');
Preset.editNodePackages().addDev('tailwindcss', '^2.1.3');
Preset.editNodePackages().addDev('postcss', '^8.3.0');
Preset.editNodePackages().addDev('autoprefixer', '^10.2.6');
Preset.extract().withDots();
Preset.installDependencies();
