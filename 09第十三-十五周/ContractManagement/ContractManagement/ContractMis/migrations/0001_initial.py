# Generated by Django 2.1.2 on 2018-12-08 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CheckInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contract_id', models.IntegerField()),
                ('time', models.DateTimeField()),
                ('results', models.CharField(max_length=50)),
                ('content', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('contract_id', models.IntegerField(primary_key=True, serialize=False)),
                ('time', models.DateTimeField()),
                ('results', models.CharField(max_length=150)),
                ('title', models.CharField(max_length=30)),
                ('abstract', models.CharField(max_length=150)),
                ('username', models.CharField(max_length=50)),
                ('content', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('level', models.IntegerField()),
            ],
        ),
    ]
