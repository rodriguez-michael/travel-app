from django.db import models
from django.conf import settings
from django.core import validators
from django.utils import timezone

class FavoriteList(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_date = models.CharField(max_length=100)
    return_date = models.CharField(max_length=100, default=None)
    oneway = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favoritelist')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=None)

    def __str__(self):
        return f"{self.origin} to {self.destination}"

# origin and destination need to be saved as airport codes
# curl -X GET 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=LAX&maxPrice=500' -H 'Authorization: Bearer WGrDOtrK7Hg8osR5IWQbZA6kgWw6'

# curl "https://test.api.amadeus.com/v1/security/oauth2/token"      -H "Content-Type: application/x-www-form-urlencoded"      -d "grant_type=client_credentials&client_id=OQihdx68C5Se27TxywHNG8TpnV5jdEXz&client_secret=C4ix5G0jcYSuWXii"


#https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2021-02-01&adults=1&nonStop=false&max=250