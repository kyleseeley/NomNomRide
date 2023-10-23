"""empty message

Revision ID: 0bbe6b9640dd
Revises:
Create Date: 2023-10-21 15:30:25.865248

"""
from alembic import op
import sqlalchemy as sa
from app.models import environment, SCHEMA

# revision identifiers, used by Alembic.
revision = '0bbe6b9640dd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('lng', sa.Float(), nullable=True),
    sa.Column('name', sa.String(length=60), nullable=False),
    sa.Column('type', sa.String(length=60), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('starRating', sa.Float(), nullable=True),
    sa.Column('numReviews', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shoppingcarts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('restaurantId', sa.Integer(), nullable=True),
    sa.Column('total', sa.DECIMAL(precision=6, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['restaurantId'], ['restaurants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cartId', sa.Integer(), nullable=True),
    sa.Column('firstname', sa.String(length=40), nullable=False),
    sa.Column('lastname', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('lng', sa.Float(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['cartId'], ['shoppingcarts.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('menuitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('restaurantId', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('type', sa.String(length=60), nullable=False),
    sa.Column('price', sa.DECIMAL(precision=6, scale=2), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['restaurantId'], ['restaurants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('restaurantId', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurantId'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shoppingcartitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cartId', sa.Integer(), nullable=False),
    sa.Column('menuItemId', sa.Integer(), nullable=False),
    sa.Column('itemQuantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cartId'], ['shoppingcarts.id'], ),
    sa.ForeignKeyConstraint(['menuItemId'], ['menuitems.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE menuitems SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE restaurants SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE shoppingcarts SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE shoppingcartitems SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shoppingcartitems')
    op.drop_table('reviews')
    op.drop_table('menuitems')
    op.drop_table('users')
    op.drop_table('shoppingcarts')
    op.drop_table('restaurants')
    # ### end Alembic commands ###
