from typing import Generator

from sqlalchemy import func
from sqlmodel import SQLModel, create_engine, Session, select

from app.config import get_settings
from app.models import User

settings = get_settings()

engine = create_engine(settings.database_url)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


def init_db():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        row_counts = session.exec(select([func.count(User.id)])).one()
        if row_counts != 0:
            return
        print('Необходимо заполнить данными')
