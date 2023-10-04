import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/api/_app/_app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
